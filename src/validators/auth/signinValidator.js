const Joi = require('joi');

const signinValidatorSchema = Joi.object().keys({
    email: Joi.string()
      .email()
      .trim()
      .required(),
    password: Joi.string()
      .required()      
  });

module.exports = signinValidatorSchema;
