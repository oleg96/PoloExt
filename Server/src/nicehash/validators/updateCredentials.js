import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    apiSecret: Joi.string().required(),
    apiKey: Joi.string().required(),
    organizationId: Joi.string().required()
  }
};
