import userRouter from "./UserController";
import userTaskRouter from "./UserTaskController";

const apiPrefix = "/api/v1";

// add your route to this list
const routes = [userRouter, userTaskRouter];

export default app => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
