import models from "../database/models";
import CustomError from "../helpers/Error";

export default class UserTaskValidator {
  static checkFields(req, res, next) {
    const { description, state, userId } = req.body;
    console.log("description", description, state, userId);
    if (!description || !state || !Number(userId)) {
      CustomError.handleError("Invalid Payloads", 400, res);
    } else {
      next();
    }
  }

  static checkParam(req, res, next) {
    const { taskId } = req.params;
    if (!Number(taskId)) {
      CustomError.handleError("Invalid user id parameter", 400, res);
    } else {
      next();
    }
  }
}
