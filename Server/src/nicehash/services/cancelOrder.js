import { Nicehash } from '../../nicehash/index.js';
const https = require('https');

export function cancelOrder(nicehash, order) {

  return new Promise((resolve, reject) => {

    https.get(`https://api.nicehash.com/api?method=orders.remove&id=${nicehash.apiId}&key=${nicehash.apiKey}&location=0&algo=${nicehash.poolAlgo}&order=${order}`, (res) => {

      let data = '';

      // A chunk of data has been recieved.
      res.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      res.on('end', () => {
        try {
          const json = JSON.parse(data);

          if (json.result.error) {
            resolve({
              message: json.result.error
            });
          }
  
          resolve({
            success: true,
            message: json.result.success
          });
        } catch (error) {
          reject({
            success: false,
            message: `Nicehash cancel order error: JSON parse error`
          });
        }
      });
    }).on("error", (err) => {
      reject({
        success: false,
        message: `Nicehash cancel order error: ${JSON.stringify(err)}`
      });
    });
  });
};

export default (userid, order) => {

  const promise = Nicehash.findOne({ userId: userid }).exec();

  return promise.then(function (nicehash) {

    if (!nicehash) {
      const result = { success: false, message: 'Nicehash cancel order failed. Credentials not found.' };

      throw result;
    } else if (nicehash) {

      return cancelOrder(nicehash, order);
    }
  });
};
