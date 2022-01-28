import { Context, Next } from "koa";

const cleanUrl = (url: string) => url.split("?")[0];

const requestLogger = async (ctx: Context, next: Next): Promise<void> => {
  await next();
  if (process.env.NODE_ENV === "development") {
    const rt = ctx.response.get("X-Response-Time");
    const url = cleanUrl(ctx.url);
    ctx.logger(`${ctx.method}: ${ctx.status} ${url} ${rt}`, "blue");
  }
};

const requestTimer = async (ctx: Context, next: Next): Promise<void> => {
  const start = Date.now();
  await next();

  ctx.set("X-Response-Time", `${Date.now() - start}ms`);
};

export { requestLogger, requestTimer };
