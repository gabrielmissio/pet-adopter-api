const { formatError, getStatusCode } = require('./../../helpers/utlis');

class BaseController {
  constructor() {
  }

  static async base({ req, res, handler, httpCode, type, serializer }) {
    try {
      const response = await handler(req[type]);
  
      return res.status(httpCode).json(serializer(response));
    } catch (error) {
      console.error(error);
      return res.status(getStatusCode(error)).json(formatError(error));
    }
  }
};

module.exports = BaseController;
