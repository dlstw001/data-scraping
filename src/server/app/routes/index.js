import healthCheckRoute from "./healthCheckRoute.js";

export default (app) => {
  const basePath = "/api/v1";

  app.use(`${basePath}/healthCheck`, healthCheckRoute);
};
