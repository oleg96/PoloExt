const PoloniexApi = require('poloniex-api-node');
import { Poloniex } from '../../poloniex/index.js';

export default (userId, price, volume) => {

  const promise = Poloniex.findOne({ userId: userId }).exec();

  return promise.then(function (poloniex) {

    if (!poloniex) {
      const result = { success: false, message: 'Poloniex exchange failed. Credentials not found.' };

      throw result;
    } else if (poloniex) {
      const poloniexApi = new PoloniexApi(poloniex.publicKey, poloniex.privateKey);

      return poloniexApi.sell('BTC_ETH', price, volume).then((exchange) => {

        if (exchange === undefined) {
          return {
            success: false,
            message: 'Undefined poloniex exchange'
          }
        } else if (exchange.error) {
          return {
            success: false,
            message: `Poloniex exchange: ${exchange.error}`
          }
        } else {
          return {
            success: true,
            message: `Poloniex exchange: ${exchange.orderNumber}`
          }
        }
      }).catch((err) => {
        return {
          success: false,
          message: `Poloniex exchange: ${err}`
        }
      });
    }
  });
};
