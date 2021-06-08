import { Nicehash } from '../models/index.js';

export default (userId, speedLimit) => {

  const promise = Nicehash.findOne({ userId: userId }).exec();

  return promise.then(function (nicehash) {

    if (!nicehash) {
      const newNicehash = new Nicehash({
        userId,
        speedLimit
      });

      return newNicehash.save();
    } else if (nicehash) {
      return Nicehash.findByIdAndUpdate(nicehash.id, {
        $set: {
          speedLimit
        }
      },
        {
          new: true
        }
      );
    }
  });
};
