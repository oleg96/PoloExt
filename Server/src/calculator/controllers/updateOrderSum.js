import { updateOrderSum } from '../services/index.js';

export default (req, res, next) => {

  updateOrderSum(req.decoded.user_id, req.body.orderSum).then(newOrderSum => {
    res.status(202).json({ success: true, message: `Order sum successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
