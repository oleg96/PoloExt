const PoloniexApi = require('poloniex-api-node');
import { Poloniex } from '../../poloniex/index.js';

export default (userId, amount) => {

  const promise = Poloniex.findOne({ userId: userId }).exec();

  return promise.then(function (poloniex) {

    if (!poloniex) {
      const result = { success: false, message: 'Poloniex withdraw failed. Credentials not found.' };

      throw result;
    } else if (poloniex) {
      const poloniexApi = new PoloniexApi(poloniex.publicKey, poloniex.privateKey);

      return poloniexApi.withdraw('BTC', amount, poloniex.wallet, null).then((withdraw) => {

        if (withdraw === undefined) {
          return {
            success: false,
            message: 'Undefined poloniex withdraw'
          }
        } else if (withdraw.error) {
          return {
            success: false,
            message: `Poloniex withdraw: ${withdraw.error}`
          }
        } else {
          return {
            success: true,
            message: `Poloniex withdraw: ${withdraw.message}`
          }
        }
      }).catch((err) => {
        return {
          success: false,
          message: `Poloniex withdraw: ${err}`
        }
      });
    }
  });
};
