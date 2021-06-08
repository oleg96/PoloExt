import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    price: Joi.string().required()
  }
};
