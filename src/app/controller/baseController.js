const { formatError, getStatusCode } = require('./../../helpers/utlis');
const serializerDisabled = response => response;

class BaseController {
  constructor() {
  }

  static async base({ req, res, handler, httpCode, type, serializer }) {
    try {
      const response = await handler(req[type]);
  
      const serializerHandler = serializer || serializerDisabled; 
      return res.status(httpCode).json(serializerHandler(response));
    } catch (error) {
      console.error(error);
      return res.status(getStatusCode(error)).json(formatError(error));
    }
  }
};



module.exports = BaseController;
