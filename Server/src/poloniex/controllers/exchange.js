import { exchange } from '../services/index.js';

export default (req, res, next) => {

  exchange(req.decoded.user_id, req.body.price, req.body.volume).then(newExchange => {
    res.status(200).json(newExchange);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Poloniex exchange failed' });
  });
};
