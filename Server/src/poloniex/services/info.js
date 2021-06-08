import { Poloniex } from '../../poloniex/index.js';
import { unionArrays } from '../../app.utils.js';
const PoloniexApi = require('poloniex-api-node');
const https = require('https');

export function getOpenOrders(poloniex) {

  const poloniexApi = new PoloniexApi(poloniex.publicKey, poloniex.privateKey);

  return poloniexApi.returnOpenOrders('BTC_ETH').then((orders) => {

    if (orders === undefined) {
      return {
        orders: {
          success: false,
          message: 'Undefined poloniex open orders'
        }
      }
    } else if (orders.error) {
      return {
        orders: {
          success: false,
          message: `Poloniex open orders: ${orders.error}`
        }
      }
    } else {
      return {
        orders: {
          success: true,
          data: orders
        }
      }
    }
  }).catch((err) => {
    return {
      orders: {
        success: false,
        message: `Poloniex open orders: ${err}`
      }
    }
  });
};

export function getChart(poloniex) {

  const poloniexApi = new PoloniexApi(poloniex.publicKey, poloniex.privateKey);

  const timeInMs = Date.now() / 1000;
  const pastTimeInMs = timeInMs - (86400 * 366);

  return poloniexApi.returnChartData('BTC_ETH', 1800, pastTimeInMs, timeInMs).then((chart) => {

    if (chart === undefined) {
      return {
        chart: {
          success: false,
          message: 'Undefined poloniex chart'
        }
      }
    } else if (chart.error) {
      return {
        chart: {
          success: false,
          message: `Poloniex chart: ${chart.error}`
        }
      }
    } else {
      return {
        chart: {
          success: true,
          data: chart
        }
      }
    }
  }).catch((err) => {
    return {
      chart: {
        success: false,
        message: `Poloniex chart: ${err}`
      }
    }
  });
};

export function getDepositsWithdrawals(poloniex) {

  const poloniexApi = new PoloniexApi(poloniex.publicKey, poloniex.privateKey);

  const timeInMs = Date.now() / 1000;
  const pastTimeInMs = timeInMs - (86400 * 366);

  return poloniexApi.returnDepositsWithdrawals(pastTimeInMs, timeInMs).then((depositsWithdrawals) => {

    if (depositsWithdrawals === undefined) {
      return {
        depositsWithdrawals: {
          success: false,
          message: 'Undefined poloniex deposits and withdrawals'
        }
      }
    } else if (depositsWithdrawals.error) {
      return {
        depositsWithdrawals: {
          success: false,
          message: `Poloniex deposits and withdrawals: ${depositsWithdrawals.error}`
        }
      }
    } else {
      return {
        depositsWithdrawals: {
          success: true,
          data: depositsWithdrawals
        }
      }
    }
  }).catch((err) => {
    return {
      depositsWithdrawals: {
        success: false,
        message: `Poloniex deposits and withdrawals: ${err}`
      }
    }
  });
};

export function getBalances(poloniex) {

  const poloniexApi = new PoloniexApi(poloniex.publicKey, poloniex.privateKey);

  return poloniexApi.returnBalances().then((balances) => {

    if (balances === undefined) {
      return {
        balances: {
          success: false,
          message: 'Undefined poloniex balances'
        }
      }
    } else if (balances.error) {
      return {
        balances: {
          success: false,
          message: `Poloniex balances: ${balances.error}`
        }
      }
    } else {
      return {
        balances: {
          success: true,
          data: {
            'BTC': balances.BTC,
            'ETH': balances.ETH
          }
        }
      }
    }
  }).catch((err) => {
    return {
      balances: {
        success: false,
        message: `Poloniex balances: ${err}`
      }
    }
  });
};

function getLastPriceEth() {

  return new Promise((resolve, reject) => {

    https.get('https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_ETH', (res) => {

      let data = '';

      // A chunk of data has been recieved.
      res.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      res.on('end', () => {
        try {
          const json = JSON.parse(data);

          resolve({
            lastPriceEth: {
              success: true,
              data: json[0].rate
            }
          });
        } catch (error) {
          reject({
            lastPriceEth: {
              success: false,
              message: `Get trade history lastPriceEth error: JSON parse error`
            }
          });
        }
      });
    }).on("error", (err) => {
      reject({
        lastPriceEth: {
          success: false,
          message: `Get trade history lastPriceEth error: ${JSON.stringify(err)}`
        }
      });
    });
  });
}

function getLastPriceUsd() {

  return new Promise((resolve, reject) => {

    https.get('https://poloniex.com/public?command=returnTradeHistory&currencyPair=USDT_BTC', (res) => {

      let data = '';

      // A chunk of data has been recieved.
      res.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      res.on('end', () => {
        try {
          const json = JSON.parse(data);

          resolve({
            lastPriceUsd: {
              success: true,
              data: json[0].rate
            }
          });
        } catch (error) {
          reject({
            lastPriceUsd: {
              success: false,
              message: `Get trade history lastPriceUsd error: JSON parse error`
            }
          });
        }
      });
    }).on("error", (err) => {
      reject({
        lastPriceUsd: {
          success: false,
          message: `Get trade history lastPriceUsd error: ${JSON.stringify(err)}`
        }
      });
    });
  });
}

export default (userid) => {

  const promise = Poloniex.findOne({ userId: userid }).exec();

  return promise.then(function (poloniex) {

    if (!poloniex) {
      const result = { success: false, message: 'Get poloniex info failed. Credentials not found.' };

      throw result;
    } else if (poloniex) {

      return Promise.all([getOpenOrders(poloniex), getChart(poloniex), getDepositsWithdrawals(poloniex), getBalances(poloniex), getLastPriceEth(), getLastPriceUsd()])
        .then(response => response.reduce(unionArrays, {}));
    }
  });
};
