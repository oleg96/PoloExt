import { poolCredentials } from '../services/index.js';

export default (req, res, next) => {

  poolCredentials(req.decoded.user_id).then(newPoolCredentials => {
    res.status(200).json(newPoolCredentials);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get pool credentials failed' });
  });
};
