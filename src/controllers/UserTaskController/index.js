import express from "express";
import UserTaskController from "./UserTaskController";
import UserTaskValidator from "../../middlewares/UserTaskValidator";
import UserValidator from "../../middlewares/UserValidator";

const UserTaskRouter = express.Router();

UserTaskRouter.get(
  "/tasks/:userId",
  UserValidator.checkParam,
  UserTaskController.getUserTasks
);

UserTaskRouter.post(
  "/tasks",
  UserTaskValidator.checkFields,
  UserTaskController.createTask
);

UserTaskRouter.put(
  "/tasks/:taskId",
  UserTaskValidator.checkParam,
  UserTaskValidator.checkFields,
  UserTaskController.updateTask
);

UserTaskRouter.delete(
  "/tasks/:taskId",
  UserTaskValidator.checkParam,
  UserTaskController.deleteTask
);

export default UserTaskRouter;
