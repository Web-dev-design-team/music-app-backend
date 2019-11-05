import Joi from 'joi';
import joiTest from './helper';

export default (data, errorHandler) => {
  if (Object.keys(data).every((e) => !data[e])) { throw new errorHandler('Please update atleast a field'); }
  const userschema = Joi.object().keys({
    name: Joi.string()
      .trim()
      .min(3)
      .optional(),
    username: Joi.string()
      .trim()
      .min(3)
      .optional(),
    bio: Joi.string()
      .trim()
      .min(2)
      .optional(),
    avatar: Joi.string()
      .trim()
      .min(3)
      .optional(),
  });
  joiTest(data, userschema, errorHandler);
};
