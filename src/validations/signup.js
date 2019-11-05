import Joi from 'joi';
import joiTest from './helper';

export default (data, errorHandler) => {
  const userschema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .min(3)
      .required(),
    username: Joi.string()
      .trim()
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .lowercase()
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
  });
  joiTest(data, userschema, errorHandler);
};
