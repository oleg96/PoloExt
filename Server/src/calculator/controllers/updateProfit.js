import { updateProfit } from '../services/index.js';

export default (req, res, next) => {

  updateProfit(req.decoded.user_id, req.body.profit).then(newProfit => {
    res.status(202).json({ success: true, message: `Profit successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
