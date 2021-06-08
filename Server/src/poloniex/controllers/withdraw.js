import { withdraw } from '../services/index.js';

export default (req, res, next) => {

  withdraw(req.decoded.user_id, req.body.amount).then(newWithdraw => {
    res.status(200).json(newWithdraw);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Poloniex withdraw failed' });
  });
};
