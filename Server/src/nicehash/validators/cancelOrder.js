import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    order: Joi.number().required()
  }
};
