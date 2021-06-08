import { automation, updateAutomationEvents } from './index.js';
import { allUsers } from '../../users/services/index.js';
import { info, profit, updatePrice } from '../../calculator/services/index.js';
import { info as nicehashInfo, order, orderPrice, orderPriceDecrease, orderSpeedLimit, speedLimit } from '../../nicehash/services/index.js';
import { info as poloniexInfo, exchangeRatio, exchange, withdraw } from '../../poloniex/services/index.js';
import { unionArrays } from '../../app.utils.js';


function averageValue(array) {

  return (array.reduce((accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue)) / array.length).toPrecision(3);
};

const changeOrderSpeedLimit = (id, orderId, speedLimit, closestPrice, profitability) => {

  orderSpeedLimit(id, orderId, speedLimit)
    .then(({ success, message }) => {
      if (success) {
        updateAutomationEvents(id, {
          message: `Changed speed limit to ${speedLimit} for order #${orderId}`,
          timestamp: new Date(),
          price: closestPrice,
          profitability,
          success: true
        });
      } else {
        updateAutomationEvents(id, {
          message: `Change speed limit for order #${orderId} error (${message})`,
          timestamp: new Date(),
          success: false
        });
      }
    })
    .catch(({ message }) => {
      updateAutomationEvents(id, {
        message: `Change speed limit for order #${orderId} error (${message})`,
        timestamp: new Date(),
        success: false
      });
    });
}

const averageUsersProfitability = {};

const automationChecker = () => {

  allUsers().then(({ users }) => {
    users.map(({ _id }) => {
      automation(_id)
        .then(({ isEnabled }) => {
          if (isEnabled) {
            automationWorker(_id);
          } else {
            averageUsersProfitability[_id] = [];
          }
        });
    });
  });
}

const automationWorker = (id) => {

  Promise.all([info(id), profit(id), nicehashInfo(id), poloniexInfo(id), exchangeRatio(id)])
    .then(response => response.reduce(unionArrays, {}))
    .then(({ profitability, profit, orderSum, closestPrice, price, userOrders, userBalance, balances, lastPriceEth, exchangeRatio, depositsWithdrawals, orders }) => {
      // Nicehash order control
      if (userOrders && !userOrders.length && userBalance && userBalance > 0) {
        order(id, userBalance, closestPrice)
          .then(({ success, message }) => {
            if (success) {
              updatePrice(id, closestPrice);
              averageUsersProfitability[id] = [];
              updateAutomationEvents(id, {
                message: `Created order (${message})`,
                timestamp: new Date(),
                price: closestPrice,
                profitability,
                success: true
              });
            } else {
              updateAutomationEvents(id, {
                message: `Created order error (${message})`,
                timestamp: new Date(),
                success: false
              });
            }
          })
          .catch(({ message }) => {
            updateAutomationEvents(id, {
              message: `Created order error (${message})`,
              timestamp: new Date(),
              success: false
            });
          });
      }

      if (!averageUsersProfitability[id]) {
        averageUsersProfitability[id] = [];
      }

      averageUsersProfitability[id].push(profitability);

      if (averageUsersProfitability[id].length === 43) {
        averageUsersProfitability[id].splice(0, 1);
      }

      const averageProfitability = averageValue(averageUsersProfitability[id]);

      if (userOrders && userOrders.length && averageProfitability > profit + 1) {
        orderPrice(id, userOrders[0].id, closestPrice)
          .then(({ success, message }) => {
            if (success) {
              updatePrice(id, closestPrice);
              if (userOrders[0].limit_speed === '0.01') {
                speedLimit(id)
                  .then(({ speedLimit }) => {
                    changeOrderSpeedLimit(id, userOrders[0].id, speedLimit, closestPrice, profitability);
                  });
              }
              updateAutomationEvents(id, {
                message: `Increased price for order #${userOrders[0].id}`,
                timestamp: new Date(),
                price: closestPrice,
                profitability,
                success: true
              });
            } else {
              updateAutomationEvents(id, {
                message: `Increase price for order #${userOrders[0].id} error (${message})`,
                timestamp: new Date(),
                success: false
              });
            }
          })
          .catch(({ message }) => {
            updateAutomationEvents(id, {
              message: `Increase price for order #${userOrders[0].id} error (${message})`,
              timestamp: new Date(),
              success: false
            });
          });
      }
      if (userOrders && userOrders.length && averageProfitability >= profit - 1 && averageProfitability <= profit + 1) {
        if (userOrders[0].limit_speed === '0.01') {
          speedLimit(id)
            .then(({ speedLimit }) => {
              changeOrderSpeedLimit(id, userOrders[0].id, speedLimit, closestPrice, profitability);
            });
        }
      }
      if (userOrders && userOrders.length && averageProfitability < profit - 1 && averageProfitability >= profit - 2.5) {
        orderPriceDecrease(id, userOrders[0].id)
          .then(({ success, message }) => {
            if (success) {
              updatePrice(id, (price - 0.0001).toPrecision(5));
              if (userOrders[0].limit_speed === '0.01') {
                speedLimit(id)
                  .then(({ speedLimit }) => {
                    changeOrderSpeedLimit(id, userOrders[0].id, speedLimit, closestPrice, profitability);
                  });
              }
              updateAutomationEvents(id, {
                message: `Decreased price for order #${userOrders[0].id}`,
                timestamp: new Date(),
                price: (price - 0.0001).toPrecision(5),
                profitability,
                success: true
              });
            } else {
              updateAutomationEvents(id, {
                message: `Decrease price for order #${userOrders[0].id} error (${message})`,
                timestamp: new Date(),
                success: false
              });
            }
          })
          .catch(({ message }) => {
            updateAutomationEvents(id, {
              message: `Decrease price for order #${userOrders[0].id} error (${message})`,
              timestamp: new Date(),
              success: false
            });
          });
      }
      if (userOrders && userOrders.length && averageProfitability < profit - 2.5) {
        orderPriceDecrease(id, userOrders[0].id)
          .then(({ success, message }) => {
            if (success) {
              updatePrice(id, (price - 0.0001).toPrecision(5));
              if (userOrders[0].limit_speed !== '0.01') {
                changeOrderSpeedLimit(id, userOrders[0].id, '0.01', closestPrice, profitability);
              }
              updateAutomationEvents(id, {
                message: `Decreased price for order #${userOrders[0].id}`,
                timestamp: new Date(),
                price: (price - 0.0001).toPrecision(5),
                profitability,
                success: true
              });
            } else {
              updateAutomationEvents(id, {
                message: `Decrease price for order #${userOrders[0].id} error (${message})`,
                timestamp: new Date(),
                success: false
              });
            }
          })
          .catch(({ message }) => {
            updateAutomationEvents(id, {
              message: `Decrease price for order #${userOrders[0].id} error (${message})`,
              timestamp: new Date(),
              success: false
            });
          });
      }

      // Poloniex control
      if (balances.success && lastPriceEth.success && balances.data.ETH * lastPriceEth.data >= orderSum * (exchangeRatio - 0.025)) {
        exchange(id, lastPriceEth.data, balances.data.ETH)
          .then(({ success, message }) => {
            if (success) {
              updateAutomationEvents(id, {
                message: `Exchange order (${message})`,
                timestamp: new Date(),
                price: lastPriceEth.data,
                success: true
              });
            } else {
              updateAutomationEvents(id, {
                message: `Exchange order error (${message})`,
                timestamp: new Date(),
                success: false
              });
            }
          })
          .catch(({ message }) => {
            updateAutomationEvents(id, {
              message: `Exchange order error (${message})`,
              timestamp: new Date(),
              success: false
            });
          });
      }

      const currentTimestamp = new Date() / 1000;
      const noWithdrawalsIn30mins = depositsWithdrawals.success && !depositsWithdrawals.data.withdrawals.filter(item => item.currency === 'BTC' && currentTimestamp - item.timestamp <= 1800).length;

      if (userBalance && userBalance === 0 && userOrders && !userOrders.length && noWithdrawalsIn30mins && orders.success && !orders.length && balances.success && balances.data.BTC >= orderSum) {
        withdraw(id, orderSum)
          .then(({ success, message }) => {
            if (success) {
              updateAutomationEvents(id, {
                message: `Withdraw (${message})`,
                timestamp: new Date(),
                sum: orderSum,
                success: true
              });
            } else {
              updateAutomationEvents(id, {
                message: `Withdraw error (${message})`,
                timestamp: new Date(),
                success: false
              });
            }
          })
          .catch(({ message }) => {
            updateAutomationEvents(id, {
              message: `Withdraw error (${message})`,
              timestamp: new Date(),
              success: false
            });
          });
      }
    })
    .catch(error => console.log(`Automation worker error: ${JSON.stringify(error)}`));
}

const automationWorkerRunner = () => {

  automationChecker();

  setInterval(automationChecker, 10000);
}

export default automationWorkerRunner;
