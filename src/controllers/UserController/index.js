import express from "express";
import UserController from "./UserController";
import UserValidator from "../../middlewares/UserValidator";

const UserRouter = express.Router();

UserRouter.get("/", UserController.home);

UserRouter.get("/users", UserController.getUsers);

UserRouter.post("/users", UserValidator.checkFields, UserController.createUser);

UserRouter.put(
  "/users/:userId",
  UserValidator.checkParam,
  UserValidator.checkFields,
  UserController.updateUser
);

UserRouter.delete(
  "/users/:userId",
  UserValidator.checkParam,
  UserController.deleteUser
);

export default UserRouter;
