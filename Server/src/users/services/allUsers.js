import { User } from '../models/index.js';

export default () => {

  const promise = User.find().exec();

  return promise.then(function (users) {

    if (!users) {
      const result = { success: false, message: 'Get users failed. Credentials not found.' };

      throw result;
    } else if (users) {
      return {
        success: true,
        users
      }
    }
  });
};
