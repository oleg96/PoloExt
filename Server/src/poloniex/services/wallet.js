import { Poloniex } from '../../poloniex/index.js';

export default (userId) => {

  const promise = Poloniex.findOne({ userId: userId }).exec();

  return promise.then(function (poloniex) {

    if (!poloniex) {
      const result = { success: false, message: 'Get poloniex wallet failed. Credentials not found.' };

      throw result;
    } else if (poloniex) {
      return {
        success: true,
        wallet: poloniex.wallet
      }
    }
  });
};
