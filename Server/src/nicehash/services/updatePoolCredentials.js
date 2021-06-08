import { Nicehash } from '../models/index.js';

export default (userId, poolId, poolAlgo) => {

  const promise = Nicehash.findOne({ userId: userId }).exec();

  return promise.then(function (nicehash) {

    if (!nicehash) {
      const newNicehash = new Nicehash({
        userId,
        poolId,
        poolAlgo
      });

      return newNicehash.save();
    } else if (nicehash) {
      return Nicehash.findByIdAndUpdate(nicehash.id, {
        $set: {
          poolId,
          poolAlgo
        }
      },
        {
          new: true
        }
      );
    }
  });
};
