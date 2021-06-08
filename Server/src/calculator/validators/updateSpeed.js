import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    speed: Joi.string().required()
  }
};
