import { Nicehash } from '../../nicehash/index.js';
import { Api } from './nicehash.util.js';
import { nicehashHost } from '../../config.js';

export function order(nicehash, amount, price) {

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

      .then(() => api.post(`/main/api/v2/hashpower/order/`, {
        body: {
          type: 'STANDARD',
          limit: nicehash.speedLimit,
          poolId: nicehash.poolId,
          price,
          marketFactor: '1000000000000',
          displayMarketFactor: 'TH',
          amount,
          algorithm: nicehash.poolAlgo,
          market: 'EU'
        }
      }))
      .then(res => {
        resolve({
          message: `Nicehash order ${res.id} was created successfully`
        });
      })
      .catch(err => {
        reject({
          success: false,
          message: `Nicehash order creation error: ${JSON.stringify(err.error)}`
        });
      });
  });
};

export default (userid, amount, price) => {

  const promise = Nicehash.findOne({ userId: userid }).exec();

  return promise.then(function (nicehash) {

    if (!nicehash) {
      const result = { success: false, message: 'Nicehash order failed. Credentials not found.' };

      throw result;
    } else if (nicehash) {
        return order(nicehash, amount, price);
    }
  });
};
