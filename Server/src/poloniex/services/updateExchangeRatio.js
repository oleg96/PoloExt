import { Poloniex } from '../models/index.js';

export default (userId, exchangeRatio) => {

  const promise = Poloniex.findOne({ userId: userId }).exec();

  return promise.then(function (poloniex) {

    if (!poloniex) {
      const newPoloniex = new Poloniex({
        userId,
        exchangeRatio
      });

      return newPoloniex.save();
    } else if (poloniex) {
      return Poloniex.findByIdAndUpdate(poloniex.id, {
        $set: {
          exchangeRatio
        }
      },
        {
          new: true
        }
      );
    }
  });
};
