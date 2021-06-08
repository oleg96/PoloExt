import { update } from '../services/index.js';

export default (req, res, next) => {

  update(req.decoded.user_id, req.body.oldPassword, req.body.newPassword).then(updateUser => {
    res.status(202).json({ success: true, message: `Password successfully changed` });
  }).catch((error) => {
    res.status(500).send(error);
  });
};
