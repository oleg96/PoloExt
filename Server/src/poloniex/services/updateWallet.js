import { Poloniex } from '../models/index.js';

export default (userId, wallet) => {

  const promise = Poloniex.findOne({ userId: userId }).exec();

  return promise.then(function (poloniex) {

    if (!poloniex) {
      const newPoloniex = new Poloniex({
        userId,
        wallet
      });

      return newPoloniex.save();
    } else if (poloniex) {
      return Poloniex.findByIdAndUpdate(poloniex.id, {
        $set: {
          wallet
        }
      },
        {
          new: true
        }
      );
    }
  });
};
