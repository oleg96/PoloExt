const PoloniexApi = require('poloniex-api-node');
import { Poloniex } from '../../poloniex/index.js';

export default (userId, orderNumber) => {

  const promise = Poloniex.findOne({ userId: userId }).exec();

  return promise.then(function (poloniex) {

    if (!poloniex) {
      const result = { success: false, message: 'Poloniex cancel exchange failed. Credentials not found.' };

      throw result;
    } else if (poloniex) {
      const poloniexApi = new PoloniexApi(poloniex.publicKey, poloniex.privateKey);

      return poloniexApi.cancelOrder(orderNumber).then((cancelExchange) => {

        if (cancelExchange === undefined) {
          return {
            success: false,
            message: 'Undefined poloniex cancel exchange'
          }
        } else if (cancelExchange.error) {
          return {
            success: false,
            message: `Poloniex cancel exchange: ${cancelExchange.error}`
          }
        } else {
          return {
            success: true,
            message: `Poloniex cancel exchange: ${cancelExchange.message}`
          }
        }
      }).catch((err) => {
        return {
          success: false,
          message: `Poloniex cancel exchange: ${err}`
        }
      });
    }
  });
};
