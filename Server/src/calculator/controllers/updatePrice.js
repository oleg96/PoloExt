import { updatePrice } from '../services/index.js';

export default (req, res, next) => {

  updatePrice(req.decoded.user_id, req.body.price).then(newPrice => {
    res.status(202).json({ success: true, message: `Price successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
