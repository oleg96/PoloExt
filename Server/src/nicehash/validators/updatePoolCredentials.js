import Joi from 'joi';

export default {
  headers: Joi.object().required(),
  body: {
    poolId: Joi.string().required(),
    poolAlgo: Joi.string().required()
  }
};
