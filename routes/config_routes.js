const sitesRouter = require("./sites");
const usersRouter = require("./users");
const booksRouter = require("./books")

exports.routesInit = (app) => {
  app.use("/sites", sitesRouter);
  app.use("/users", usersRouter);
  app.use("/books",booksRouter);
};
