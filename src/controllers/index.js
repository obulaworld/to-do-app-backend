import populationRouter from "./PopulationController";

const apiPrefix = "/api/v1";

// add your route to this list
const routes = [populationRouter];

export default app => {
  routes.forEach(route => app.use(apiPrefix, route));
  return app;
};
