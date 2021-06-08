import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    wallet: Joi.string().required()
  }
};
