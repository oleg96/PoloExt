import { orderPriceDecrease } from '../services/index.js';

export default (req, res, next) => {

  orderPriceDecrease(req.decoded.user_id, req.body.order).then(newOrderPriceDecrease => {
    res.status(200).json(newOrderPriceDecrease);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Nicehash order price decrease failed' });
  });
};
