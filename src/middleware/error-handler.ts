import { Context, Next } from "koa";

export default async (ctx: Context, next: Next): Promise<void> => {
  try {
    await next();
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";

    ctx.status = status;
    ctx.body = { errors: [message] };

    ctx.app.emit("error", `${status}: ${message}`, ctx);
  }
};
