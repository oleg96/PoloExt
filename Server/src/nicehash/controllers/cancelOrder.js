import { cancelOrder } from '../services/index.js';

export default (req, res, next) => {

  cancelOrder(req.decoded.user_id, req.body.order).then(cancelOrder => {
    res.status(200).json(cancelOrder);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Nicehash cancel order failed' });
  });
};
