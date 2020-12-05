const compose = require("koa-compose");
const helmet = require("koa-helmet");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const errorHandler = require("./error-handler");
const { requestLogger, requestTimer } = require("./logger");

module.exports = () =>
  compose([
    requestLogger,
    requestTimer,
    errorHandler,
    helmet(),
    cors(),
    bodyParser(),
  ]);
