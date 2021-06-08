import { Nicehash } from '../models/index.js';

export default (userId, apiSecret, apiKey, organizationId) => {

  const promise = Nicehash.findOne({ userId: userId }).exec();

  return promise.then(function (nicehash) {

    if (!nicehash) {
      const newNicehash = new Nicehash({
        userId,
        apiSecret,
        apiKey,
        organizationId
      });

      return newNicehash.save();
    } else if (nicehash) {
      return Nicehash.findByIdAndUpdate(nicehash.id, {
        $set: {
          apiSecret,
          apiKey,
          organizationId
        }
      },
        {
          new: true
        }
      );
    }
  });
};
