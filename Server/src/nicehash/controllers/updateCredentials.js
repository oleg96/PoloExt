import { updateCredentials } from '../services/index.js';

export default (req, res, next) => {

  updateCredentials(req.decoded.user_id, req.body.apiSecret, req.body.apiKey, req.body.organizationId).then(newCredentials => {
    res.status(202).json({ success: true, message: `Credentials successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
