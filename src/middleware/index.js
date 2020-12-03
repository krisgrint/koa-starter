const compose = require("koa-compose");
const helmet = require("koa-helmet");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const errorHandler = require("./error-handler");
const { requestLogger } = require("./logger");

module.exports = () =>
  compose([errorHandler, helmet(), cors(), bodyParser(), requestLogger]);
