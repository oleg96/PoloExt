import { Nicehash } from '../../nicehash/index.js';
const https = require('https');

export function orderSpeedLimit(nicehash, order, speedLimit) {

  return new Promise((resolve, reject) => {

    https.get(`https://api.nicehash.com/api?method=orders.set.limit&id=${nicehash.apiId}&key=${nicehash.apiKey}&location=0&algo=${nicehash.poolAlgo}&order=${order}&limit=${speedLimit}`, (res) => {

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
            message: `Nicehash order speed limit error: JSON parse error`
          });
        }
      });
    }).on("error", (err) => {
      reject({
        success: false,
        message: `Nicehash order speed limit error: ${JSON.stringify(err)}`
      });
    });
  });
};

export default (userid, order, speedLimit) => {

  const promise = Nicehash.findOne({ userId: userid }).exec();

  return promise.then(function (nicehash) {

    if (!nicehash) {
      const result = { success: false, message: 'Nicehash order speed limit failed. Credentials not found.' };

      throw result;
    } else if (nicehash) {

      return orderSpeedLimit(nicehash, order, speedLimit);
    }
  });
};
