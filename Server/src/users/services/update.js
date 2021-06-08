import { User } from '../models/index.js';
const bcrypt = require('bcrypt');

export default (id, oldPassword, newPassword) => {

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);

  const promise = User.findOne({ _id: id }).exec();

  return promise.then(function (user) {

    if (bcrypt.compareSync(oldPassword, user.passwordHash)) {
      return User.findByIdAndUpdate(id, {
        $set: {
          passwordHash: hash
        }
      },
        {
          new: true
        }
      );
    } else {
      return Promise.reject();
    }
  })
};
