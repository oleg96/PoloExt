import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    profit: Joi.string().required()
  }
};
