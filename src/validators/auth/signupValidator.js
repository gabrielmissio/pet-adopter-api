const Joi = require('joi');
const passwordRegex = require('./../../helpers/regex/passwordRegex');

const signinValidatorSchema = Joi.object().keys({
    name: Joi.string()
      .required(),
    email: Joi.string()
      .email()
      .trim()
      .required(),
    password: Joi.string()
      .pattern(passwordRegex)
      .required(),
    addresses: Joi.array()
      .min(1),
    phones: Joi.array()
      .min(1),
    photos: Joi.array()
      .min(1),
    description: Joi.string()
      
  });

module.exports = signinValidatorSchema;
