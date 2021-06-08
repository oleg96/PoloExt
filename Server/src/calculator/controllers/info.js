import { info } from '../services/index.js';

export default (req, res, next) => {

  info(req.decoded.user_id).then(newInfo => {
    res.status(200).json(newInfo);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get calculator info failed' });
  });
};
