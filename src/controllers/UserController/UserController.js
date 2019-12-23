import models from "../../database/models";
import CustomError from "../../helpers/Error";

export default class UserController {
  static home(req, res) {
    res.status(200).send("Welcome to To Do Web Application");
  }

  static async createUser(req, res) {
    try {
      const { name } = req.body;

      const foundUser= await models.User.findOne({
        where: { name }
      });

      if (foundUser) {
        CustomError.handleError("User already exists", 409, res);
        return;
      }

      const createdUser = await models.User.create({
        name,
      });

      if (createdUser) {
        return res.status(201).json({
          success: true,
          message: "User created successfully",
          user: createdUser
        });
      }
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await models.User.findAll({
        order: [["createdAt", "DESC"]]
      });
      if (users.length < 1) {
        CustomError.handleError("No user found", 404, res);
      }

      return res.status(200).json({
        success: true,
        message: "Users found",
        users
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

  static async updateUser(req, res) {
    try {
      const { name } = req.body;
      const { userId } = req.params;

      const foundUser= await models.User.findOne({
        where: { id: userId }
      });

      if (!foundUser) {
        return res.status(400).json({
          success: false,
          message: "The user does not exist"
        });
      }

      const updatedUser = await foundUser.update({
        name,
      });

      return res.status(200).json({
        success: true,
        message: "User Successfully updated",
        user: updatedUser
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const foundUser = await models.User.findOne({
        where: { id: userId }
      });

      if (!foundUser) {
        return res.status(400).json({
          success: false,
          message: "The user does not exist"
        });
      }

      await foundUser.destroy();

      return res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }
}
