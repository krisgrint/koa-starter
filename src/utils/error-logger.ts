import { Context } from "koa";
import { ResponseError } from "./types";

export default (error: ResponseError, ctx: Context): void => {
  ctx.logger(`${error.status}: ${error.message}`, "red");
};
