import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    orderSum: Joi.string().required()
  }
};
