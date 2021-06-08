const https = require('https');
import { Nicehash } from '../../nicehash/index.js';
import { unionArrays } from '../../app.utils.js';
import { Api } from './nicehash.util.js';
import { nicehashHost } from '../../config.js';

export function getAllOrders(nicehash) {

  return new Promise((resolve, reject) => {

    https.get(`${nicehashHost}/main/api/v2/hashpower/orderBook?algorithm=${nicehash.poolAlgo}&size=1000`, (res) => {

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
            allOrders: json.stats.EU.orders
          });
        } catch (error) {
          reject({
            success: false,
            message: `Get all nicehash orders error: JSON parse error`
          });
        }
      });
    }).on("error", (err) => {
      reject({
        success: false,
        message: `Get all nicehash orders error: ${JSON.stringify(err)}`
      });
    });
  });
};

export function getUserOrders(nicehash) {

  const api = new Api({
    apiHost: nicehashHost,
    apiKey: nicehash.apiKey,
    apiSecret: nicehash.apiSecret,
    orgId: nicehash.organizationId
  });
  
  return new Promise((resolve, reject) => {

    api.getTime()
	    .then(res => {
        return res.serverTime;
      })

	    .then(serverTime => api.get(`/main/api/v2/hashpower/myOrders?status=ACTIVE&market=EU&algorithm=${nicehash.poolAlgo}&ts=${serverTime}&op=GE&limit=10`))
	    .then(res => {
        resolve({
          userOrders: res.list
        });
      })
      .catch(err => {
        reject({
          success: false,
          message: `Get nicehash user orders error: ${JSON.stringify(err.error)}`
        });
      });
  });
};

export function getUserBalance(nicehash) {

  const api = new Api({
    apiHost: nicehashHost,
    apiKey: nicehash.apiKey,
    apiSecret: nicehash.apiSecret,
    orgId: nicehash.organizationId
  });
  
  return new Promise((resolve, reject) => {

    api.getTime()
	    .then(res => {
        return res.serverTime;
      })

      .then(() => api.get(`/main/api/v2/accounting/account/TBTC/`))
	    .then(res => {
        resolve({
          userBalance: res.balance
        });
      })
      .catch(err => {
        reject({
          success: false,
          message: `Get nicehash user balance error: ${JSON.stringify(err.error)}`
        });
      });
  });
};

export default (userid) => {

  const promise = Nicehash.findOne({ userId: userid }).exec();

  return promise.then(function (nicehash) {

    if (!nicehash) {
      const result = { success: false, message: 'Get nicehash info failed. Credentials not found.' };

      throw result;
    } else if (nicehash) {

      return Promise.all([getAllOrders(nicehash), getUserOrders(nicehash), getUserBalance(nicehash)])
        .then(response => response.reduce(unionArrays, {}))
        .catch(error => ({ success: false, message: `Get nicehash info failed. Error: ${error}` }));
    }
  });
};
