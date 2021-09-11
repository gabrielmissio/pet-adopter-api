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
      .required()      
  });

module.exports = signinValidatorSchema;
