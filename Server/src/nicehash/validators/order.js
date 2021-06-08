import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    amount: Joi.string().required(),
    price: Joi.string().required()
  }
};
