import { speedLimit } from '../services/index.js';

export default (req, res, next) => {

  speedLimit(req.decoded.user_id).then(newSpeedLimit => {
    res.status(200).json(newSpeedLimit);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get nicehash speed limit failed' });
  });
};
