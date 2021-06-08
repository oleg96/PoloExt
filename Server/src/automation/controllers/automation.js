import { automation } from '../services/index.js';

export default (req, res, next) => {

  automation(req.decoded.user_id).then(newAutomation => {
    res.status(200).json(newAutomation);
  }).catch((error) => {
    res.status(422).json({ 'message': 'Get automation failed' });
  });
};
