import { profit } from '../services/index.js';

export default (req, res, next) => {

  profit(req.decoded.user_id).then(newProfit => {
    res.status(200).json(newProfit);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get calculator profit failed' });
  });
};
