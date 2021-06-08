import { register } from '../services/index.js';

export default (req, res, next) => {

  register(req.body.email, req.body.password).then(newUser => {
    res.status(201).json({ 'message': 'Registration completed' });
  }).catch((error) => {
    res.status(422).json({ 'message': 'Registration failed' });
  });
};
