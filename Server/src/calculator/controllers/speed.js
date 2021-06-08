import { speed } from '../services/index.js';

export default (req, res, next) => {

  speed(req.decoded.user_id).then(newSpeed => {
    res.status(200).json(newSpeed);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get calculator speed failed' });
  });
};
