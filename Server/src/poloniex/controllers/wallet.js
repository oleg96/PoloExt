import { wallet } from '../services/index.js';

export default (req, res, next) => {

  wallet(req.decoded.user_id).then(newWallet => {
    res.status(200).json(newWallet);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get poloniex wallet failed' });
  });
};
