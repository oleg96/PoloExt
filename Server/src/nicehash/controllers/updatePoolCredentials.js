import { updatePoolCredentials } from '../services/index.js';

export default (req, res, next) => {

  updatePoolCredentials(req.decoded.user_id, req.body.poolId, req.body.poolAlgo).then(newPoolCredentials => {
    res.status(202).json({ success: true, message: `Credentials successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
