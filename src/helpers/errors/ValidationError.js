class ValidationError extends Error {
  constructor(error, path) {
    super(error);
    Error.captureStackTrace(this, this.constructor);
    this.errors = error.details.map(detail => ({
      description: detail.message,
      message: 'profileError',
      extensions: {
        code: 'FIELD_MALFORMED',
        params: [{
          key: 'fieldName',
          value: path || detail.path.join('.')
        }]
      }
    }));
  }
}

module.exports = ValidationError;
