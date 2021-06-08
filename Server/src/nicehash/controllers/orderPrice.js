import { orderPrice } from '../services/index.js';

export default (req, res, next) => {

  orderPrice(req.decoded.user_id, req.body.order, req.body.price).then(newOrderPrice => {
    res.status(200).json(newOrderPrice);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Nicehash order price failed' });
  });
};
