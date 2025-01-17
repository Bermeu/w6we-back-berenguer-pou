require("dotenv").config();
const debug = require("debug")("robots:server");
const chalk = require("chalk");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundError, generalError } = require("./middlewares/errors");
const robotsRouter = require("./routers/robotsRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();

const startServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(chalk.yellow(`Server listening on port ${port}`));
      resolve();
    });

    server.on("error", (error) => {
      reject(error);
    });
  });

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use("/users", usersRouter);
app.use("/robots", robotsRouter);
app.use(notFoundError);
app.use(generalError);

module.exports = startServer;
