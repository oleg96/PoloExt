import { Nicehash } from '../../nicehash/index.js';

export default (userId) => {

  const promise = Nicehash.findOne({ userId: userId }).exec();

  return promise.then(function (nicehash) {

    if (!nicehash) {
      const result = { success: false, message: 'Get pool credentials failed. Credentials not found.' };

      throw result;
    } else if (nicehash) {
      return {
        success: true,
        poolId: nicehash.poolId,
        poolAlgo: nicehash.poolAlgo
      }
    }
  });
};
