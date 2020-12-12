import { Context } from "koa";

export default async (ctx: Context): Promise<void> => {
  ctx.status = 200;
  ctx.body = {
    message: "Service is up",
  };
};
