class RequestError extends Error {
  constructor(message, status, error) {
    super(error);
    Error.captureStackTrace(this, this.constructor);
    this.errors = {
      statusCode: status || 500,
      description: message,
      error: error
    };
  }
}

module.exports = RequestError;
