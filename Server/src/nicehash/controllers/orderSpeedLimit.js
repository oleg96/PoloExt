import { orderSpeedLimit } from '../services/index.js';

export default (req, res, next) => {

  orderSpeedLimit(req.decoded.user_id, req.body.order, req.body.speedLimit).then(newOrderSpeedLimit => {
    res.status(200).json(newOrderSpeedLimit);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Nicehash order speed limit failed' });
  });
};
