import Koa from "koa";
import router from "./router";
import logger from "./logger";
import { errorHandler, requestLogger, requestTimer } from "./middleware";
import passport from "koa-passport";
import helmet from "koa-helmet";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import errorLogger from "./utils/error-logger";
import initializePassport from "./passport";

const app = new Koa();
initializePassport();

app.context.logger = logger(console);

app.use(requestTimer);
app.use(requestLogger);
app.use(helmet());
app.use(cors());
app.use(bodyParser());
app.use(passport.initialize());
app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());
app.on("error", errorLogger);

export default app;
