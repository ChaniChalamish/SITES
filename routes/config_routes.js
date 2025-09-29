const sitesRouter = require("./sites");
const usersRouter = require("./users");

exports.routesInit = (app) => {
  app.use("/sites", sitesRouter);
  app.use("/users", usersRouter);
};
