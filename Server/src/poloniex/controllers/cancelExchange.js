import { cancelExchange } from '../services/index.js';

export default (req, res, next) => {

  cancelExchange(req.decoded.user_id, req.body.orderNumber).then(cancelExchange => {
    res.status(200).json(cancelExchange);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Poloniex cancel exchange failed' });
  });
};
