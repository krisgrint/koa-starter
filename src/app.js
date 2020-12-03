const Koa = require("koa");
const middleware = require("./middleware");
const router = require("./router");
const logger = require("./logger")(console);
const { errorLogger } = require("./middleware/logger");

const app = new Koa();

app.context.logger = logger;

app.use(middleware());
app.use(router.routes());
app.use(router.allowedMethods());
app.on("error", errorLogger);

module.exports = app;
