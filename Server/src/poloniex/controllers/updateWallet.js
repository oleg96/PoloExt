import { updateWallet } from '../services/index.js';

export default (req, res, next) => {

  updateWallet(req.decoded.user_id, req.body.wallet).then(newWallet => {
    res.status(202).json({ success: true, message: `Wallet successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
