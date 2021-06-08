import { updateAutomation } from '../services/index.js';

export default (req, res, next) => {

  updateAutomation(req.decoded.user_id, req.body.isEnabled).then(newIsEnabled => {
    res.status(202).json({ success: true, message: `Automation state successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
