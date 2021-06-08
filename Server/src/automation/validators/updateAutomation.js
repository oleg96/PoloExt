import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    isEnabled: Joi.boolean().required()
  }
};
