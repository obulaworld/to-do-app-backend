import models from "../database/models";
import CustomError from "../helpers/Error";

export default class UserValidator {
  static checkFields(req, res, next) {
    const { name } = req.body;
    if (!name) {
      CustomError.handleError("Invalid Payloads", 400, res);
    } else {
      next();
    }
  }

  static checkParam(req, res, next) {
    const { userId } = req.params;
    if (!Number(userId)) {
      CustomError.handleError("Invalid user id parameter", 400, res);
    } else {
      next();
    }
  }
}
