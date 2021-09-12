const { httpCodesEnums: { OK, CREATED } } = require('./../../helpers/enums');
const { singin: signinService, singup: singupService } = require('./../service/authService');
const { serialize: sessionSerialize } = require('./../serializer/auth/sessionSerializer');
const BaseController = require('./baseController');

class AuthController extends BaseController {
  constructor() {
  }

  static async singup(req, res) {
    super.base(
      {
        req: req,
        res: res,
        handler: singupService,
        httpCode: CREATED,
        type: 'body',
        serializer: sessionSerialize
      }
    )
  }

  static async singin(req, res) {
    super.base(
      {
        req: req,
        res: res,
        handler: signinService,
        httpCode: OK,
        type: 'body',
        serializer: sessionSerialize
      }
    )
  }
}

module.exports = AuthController;
