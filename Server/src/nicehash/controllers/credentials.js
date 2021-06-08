import { credentials } from '../services/index.js';

export default (req, res, next) => {

  credentials(req.decoded.user_id).then(newCredentials => {
    res.status(200).json(newCredentials);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get nicehash credentials failed' });
  });
};
