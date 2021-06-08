import { price } from '../services/index.js';

export default (req, res, next) => {

  price(req.decoded.user_id).then(newPrice => {
    res.status(200).json(newPrice);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get calculator price failed' });
  });
};
