import { updateSpeed } from '../services/index.js';

export default (req, res, next) => {

  updateSpeed(req.decoded.user_id, req.body.speed).then(newSpeed => {
    res.status(202).json({ success: true, message: `Speed successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
