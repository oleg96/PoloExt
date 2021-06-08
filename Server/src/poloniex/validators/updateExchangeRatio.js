import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    exchangeRatio: Joi.string().required()
  }
};
