import { exchangeRatio } from '../services/index.js';

export default (req, res, next) => {

  exchangeRatio(req.decoded.user_id).then(newExchangeRatio => {
    res.status(200).json(newExchangeRatio);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get poloniex exchange ratio failed' });
  });
};
