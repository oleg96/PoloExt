import { Calculator } from '../../calculator/index.js';
const https = require('https');

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
            lastPriceEth: json[0].rate
          });
        } catch (error) {
          reject({
            success: false,
            message: `Get trade history lastPriceEth error: JSON parse error`
          });
        }
      });
    }).on("error", (err) => {
      reject({
        success: false,
        message: `Get trade history lastPriceEth error: ${JSON.stringify(err)}`
      });
    });
  });
}

function getPastDayPriceEth() {

  return new Promise((resolve, reject) => {

    const timeInMs = Date.now() / 1000;
    const pastTimeInMs = timeInMs - 86400;

    https.get(`https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_ETH&end=${pastTimeInMs}`, (res) => {

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
            pastDayPriceEth: json[0].rate
          });
        } catch (error) {
          reject({
            success: false,
            message: `Get trade history pastDayPriceEth error: JSON parse error`
          });
        }
      });
    }).on("error", (err) => {
      reject({
        success: false,
        message: `Get trade history pastDayPriceEth error: ${JSON.stringify(err)}`
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
            lastPriceUsd: json[0].rate
          });
        } catch (error) {
          reject({
            success: false,
            message: `Get trade history lastPriceUsd error: JSON parse error`
          });
        }
      });
    }).on("error", (err) => {
      reject({
        success: false,
        message: `Get trade history lastPriceUsd error: ${JSON.stringify(err)}`
      });
    });
  });
}

function getPoloniexEthConfirmations() {

  return new Promise((resolve, reject) => {

    https.get('https://poloniex.com/public?command=returnCurrencies', (res) => {

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
            minConf: json.ETH.minConf
          });
        } catch (error) {
          reject({
            success: false,
            message: `Get poloniex ETH confirmations error: JSON parse error`
          });
        }
      });
    }).on("error", (err) => {
      reject({
        success: false,
        message: `Get poloniex ETH confirmations error: ${JSON.stringify(err)}`
      });
    });
  });
}

function getPastDayPriceUsd() {

  return new Promise((resolve, reject) => {

    const timeInMs = Date.now() / 1000;
    const pastTimeInMs = timeInMs - 86400;

    https.get(`https://poloniex.com/public?command=returnTradeHistory&currencyPair=USDT_BTC&end=${pastTimeInMs}`, (res) => {

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
            pastDayPriceUsd: json[0].rate
          });
        } catch (error) {
          reject({
            success: false,
            message: `Get trade history pastDayPriceUsd error: JSON parse error`
          });
        }
      });
    }).on("error", (err) => {
      reject({
        success: false,
        message: `Get trade history pastDayPriceUsd error: ${JSON.stringify(err)}`
      });
    });
  });
}

function closestNumberIndex(number, array) {

  let closestIndex = -1;
  let closest = 0;

  array.map((item, index) => {
    if (closest === -1 || Math.abs(number - closest) > Math.abs(item - number)) {
      closest = item;
      closestIndex = index;
    }
  });

  return closestIndex;
}

export default (userid) => {

  const promise = Calculator.findOne({ userId: userid }).exec();

  return promise.then(function (calculator) {

    if (!calculator) {
      const result = { success: false, message: 'Get calculator info failed. Credentials not found.' };

      throw result;
    } else if (calculator) {

      return new Promise((resolve, reject) => {

        https.get('https://api.blockchair.com/ethereum/stats', (res) => {

          let data = '';

          // A chunk of data has been recieved.
          res.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received.
          res.on('end', () => {
            try {

              const json = JSON.parse(data);

              Promise.all([getLastPriceEth(), getLastPriceUsd(), getPastDayPriceEth(), getPastDayPriceUsd(), getPoloniexEthConfirmations()]).then(res => {
                const lastPriceEth = res[0].lastPriceEth;
                const lastPriceUsd = res[1].lastPriceUsd;
                const pastDayPriceEth = res[2].pastDayPriceEth;
                const pastDayPriceUsd = res[3].pastDayPriceUsd;
                const minPoloniexConf = res[4].minConf;
                const coinotronConf = 200;
                const blockTime = (1 / 60) * (86400 / json.data.blocks_24h);
                const blockReward = 2;
                const confirmationTime = blockTime / 60 / 24;
                const calculatorPrice = calculator.price;
                const orderSum = calculator.orderSum;
                const commissionPercent = 0.0005 / orderSum;
                const difficulty = json.data.difficulty;
                const coins = ((1000000 * blockReward * 1000000 / difficulty) * 3600 * 24).toPrecision(5);
                const coinsBTC = (coins * lastPriceEth).toPrecision(4);
                const profitability = (((coinsBTC / calculatorPrice) - 1.05 - commissionPercent) * 100).toPrecision(3);
                const priceArray = Array(1000).fill(1).map((currElement, index) => (0.005 * index).toPrecision(3));
                const profitabilityArray = priceArray.map(price => (((coinsBTC / price) - 1.05) * 100).toPrecision(3));
                const closestPrice = priceArray[closestNumberIndex(calculator.profit, profitabilityArray)];

                const speed = calculator.speed;
                const prediction = [];
                const calculatedSpeed = profitability > 1.35 ? speed / (profitability * 3 - 4) : speed;
                const nicehashTime = (orderSum / (calculatorPrice * calculatedSpeed));
                const nicehashTimeTotalMinutes = Math.floor(nicehashTime * 1440);
                const nicehashTimeDays = nicehashTimeTotalMinutes / 1440;
                const nicehashTimeDay = Math.floor(nicehashTimeDays);
                const nicehashTimeHours = (nicehashTimeDays - nicehashTimeDay) * 24;
                const nicehashTimeHour = nicehashTimeHours < 10 ? `0${Math.floor(nicehashTimeHours)}` : Math.floor(nicehashTimeHours);
                const nicehashTimeMinutes = (nicehashTimeHours - nicehashTimeHour) * 60;
                const nicehashTimeMinute = nicehashTimeMinutes < 10 ? `0${Math.floor(nicehashTimeMinutes)}` : Math.floor(nicehashTimeMinutes);
                const nicehashTimeString = `${nicehashTimeDay}:${nicehashTimeHour}:${nicehashTimeMinute}`;

                const dayStep = (orderSum / (calculatorPrice * calculatedSpeed)) + (minPoloniexConf + coinotronConf) * confirmationTime;
                const dayProfitability = ((1 / dayStep) * profitability).toPrecision(3);
                const dayCoinsBTC = (orderSum * (1 + dayProfitability / 100) - orderSum).toPrecision(8);
                const fullTimeTotalMinutes = Math.floor(dayStep * 1440);
                const fullTimeDays = fullTimeTotalMinutes / 1440;
                const fullTimeDay = Math.floor(fullTimeDays);
                const fullTimeHours = (fullTimeDays - fullTimeDay) * 24;
                const fullTimeHour = fullTimeHours < 10 ? `0${Math.floor(fullTimeHours)}` : Math.floor(fullTimeHours);
                const fullTimeMinutes = (fullTimeHours - fullTimeHour) * 60;
                const fullTimeMinute = fullTimeMinutes < 10 ? `0${Math.floor(fullTimeMinutes)}` : Math.floor(fullTimeMinutes);
                const fullTimeString = `${fullTimeDay}:${fullTimeHour}:${fullTimeMinute}`;

                for (let index = 0; index < 30; index++) {
                  prediction.push(0);
                }

                prediction[0] = {
                  sumBtc: orderSum
                };
                prediction.forEach((element, index) => {
                  if (index > 0) {
                    const sumBtc = (parseFloat(prediction[index - 1].sumBtc) + (orderSum * (1 + (profitability / 100)) - orderSum)).toPrecision(8);
                    prediction[index] = {
                      sumBtc,
                      sumUsd: (sumBtc * lastPriceUsd).toPrecision(8),
                      date: new Date(Date.now() + (index * dayStep) * 24 * 3600 * 1000)
                    }
                  }
                });
                prediction.shift();

                resolve({
                  success: true,
                  difficulty,
                  coins,
                  coinsBTC,
                  profitability,
                  profit: calculator.profit,
                  price: calculatorPrice,
                  orderSum,
                  lastPriceUsd,
                  lastPriceEth,
                  pastDayPriceEth,
                  pastDayPriceUsd,
                  prediction,
                  nicehashTimeString,
                  fullTimeString,
                  dayCoinsBTC,
                  dayProfitability,
                  closestPrice
                });
              }).catch(error => 
                reject({
                success: false,
                message: `BTC calculator data loading error: ${error}`
              }));
            } catch (error) {
              reject({
                success: false,
                message: `BTC calculator data loading error: JSON parse error`
              });
            }
          });
        }).on("error", (err) => {
          reject({
            success: false,
            message: `BTC calculator data loading error: ${JSON.stringify(err)}`
          });
        });
      });
    }
  });
};
