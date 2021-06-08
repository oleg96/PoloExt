const bcrypt = require('bcrypt');
import config from '../../config.js';
import { User } from '../../users/index.js';
import jwt from 'jsonwebtoken';

export default (email, password) => {

  const promise = User.findOne({ email: email }).exec();

  return promise.then(function (user) {

    if (!user) {
      const result = { success: false, message: 'Authentication failed. User not found.' };

      throw result;
    } else if (user) {
      const now = new Date();
      const lockDate = new Date(user.lockDate);
      const unlockDate = new Date(lockDate.getTime() + 3600 * 1000);

      if (now.getTime() > unlockDate.getTime()) {
        if (bcrypt.compareSync(password, user.passwordHash)) {
          const token = jwt.sign({ user_id: user._id }, config.jwtSecret, {
            expiresIn: 10800
          });

          user.loginAttempts = 1;
          user.save();

          return {
            success: true,
            message: 'Successful login',
            token: token
          };
        } else {
          const result = { success: false, message: 'Authentication failed. Wrong password.' };

          user.loginAttempts = user.loginAttempts + 1;
          if (user.loginAttempts === 5) {
            user.lockDate = Date();
          }
          user.save();

          throw result;
        }
      } else {
        const result = { success: false, message: 'Authentication failed. Overlimit of login attempts.' };

        throw result;
      }
    }
  });
};
