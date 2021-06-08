import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
  },
};
