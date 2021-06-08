import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    orderNumber: Joi.string().required()
  }
};
