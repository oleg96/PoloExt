import { updateSpeedLimit } from '../services/index.js';

export default (req, res, next) => {

  updateSpeedLimit(req.decoded.user_id, req.body.speedLimit).then(newSpeedLimit => {
    res.status(202).json({ success: true, message: `Speed limit successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
