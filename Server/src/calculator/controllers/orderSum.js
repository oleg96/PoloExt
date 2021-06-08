import { orderSum } from '../services/index.js';

export default (req, res, next) => {

  orderSum(req.decoded.user_id).then(newOrderSum => {
    res.status(200).json(newOrderSum);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get calculator order sum failed' });
  });
};
