import models from "../../database/models";
import CustomError from "../../helpers/Error";

export default class UserTaskController {
  static async createTask(req, res) {
    try {
      const { description, state, userId } = req.body;

      const createdTask = await models.UserTasks.create({
        description,
        state,
        user_id: userId
      });

      if (createdTask) {
        return res.status(201).json({
          success: true,
          message: "Task created successfully",
          task: createdTask
        });
      }
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

  static async getUserTasks(req, res) {
    try {
      const { userId } = req.params;
      const foundUser = await models.User.findOne({
        where: { id: userId }
      });

      if (!foundUser) {
        CustomError.handleError("No user found", 404, res);
      }

      const foundTasks = await models.UserTasks.findAll({
        where: { user_id: userId }
      });

      return res.status(200).json({
        success: true,
        message: "Tasks found",
        tasks: foundTasks
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

  static async updateTask(req, res) {
    try {
      const { taskId } = req.params;
      const { description, state, userId } = req.body;

      const foundTask = await models.UserTasks.findOne({
        where: { id: taskId }
      });

      if (!foundTask) {
        return res.status(404).json({
          success: false,
          message: "The task does not exist"
        });
      }

      const updatedTask = await foundTask.update({
        description,
        state,
        user_id: userId
      });

      return res.status(200).json({
        success: true,
        message: "Task Successfully updated",
        task: updatedTask
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }

  static async deleteTask(req, res) {
    try {
      const { taskId } = req.params;
      const foundTask = await models.UserTasks.findOne({
        where: { id: taskId }
      });

      if (!foundTask) {
        return res.status(400).json({
          success: false,
          message: "The task does not exist"
        });
      }

      await foundTask.destroy();

      return res.status(200).json({
        success: true,
        message: "Task deleted successfully"
      });
    } catch (error) {
      CustomError.handleError(error.message, 500, res);
    }
  }
}
