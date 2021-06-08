import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    speedLimit: Joi.string().required()
  }
};
