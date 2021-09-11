const ValidationError = require('./../helpers/errors/ValidationError');

module.exports = (schema, property) => { 
  return (req, res, next) => { 
    try {
      const { error } = schema.validate(req[property], { abortEarly: false }); 
      
      if (error) { 
        throw new ValidationError(error);
      }

      return next();
    } catch (error) {
      return res.status(400).json(error);
    }
  };
};
