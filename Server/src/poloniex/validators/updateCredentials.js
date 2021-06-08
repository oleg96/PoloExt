import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    publicKey: Joi.string().required(),
    privateKey: Joi.string().required()
  }
};
