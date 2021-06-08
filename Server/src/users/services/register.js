import { User } from '../models/index.js';
const bcrypt = require('bcrypt');

export default (email, password) => {

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const newUser = new User({
    email,
    passwordHash: hash
  });

  return newUser.save();
};
