import { updateExchangeRatio } from '../services/index.js';

export default (req, res, next) => {

  updateExchangeRatio(req.decoded.user_id, req.body.exchangeRatio).then(newExchangeRatio => {
    res.status(202).json({ success: true, message: `Exchange ratio successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
