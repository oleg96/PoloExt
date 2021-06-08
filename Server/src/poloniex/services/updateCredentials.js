import { Poloniex } from '../models/index.js';

export default (userId, publicKey, privateKey) => {

  const promise = Poloniex.findOne({ userId: userId }).exec();

  return promise.then(function (poloniex) {

    if (!poloniex) {
      const newPoloniex = new Poloniex({
        userId,
        publicKey,
        privateKey
      });

      return newPoloniex.save();
    } else if (poloniex) {
      return Poloniex.findByIdAndUpdate(poloniex.id, {
        $set: {
          publicKey,
          privateKey
        }
      },
        {
          new: true
        }
      );
    }
  });
};
