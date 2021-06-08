import { order } from '../services/index.js';

export default (req, res, next) => {

  order(req.decoded.user_id, req.body.amount, req.body.price).then(newOrder => {
    res.status(200).json(newOrder);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Nicehash order failed' });
  });
};
