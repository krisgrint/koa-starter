exports.requestLogger = async (ctx, next) => {
  await next();
  if (process.env.NODE_ENV === "development") {
    const rt = ctx.response.get("X-Response-Time");
    ctx.logger(`${ctx.method}: ${ctx.status} ${ctx.url} ${rt}`, "blue");
  }
};

exports.requestTimer = async (ctx, next) => {
  const start = Date.now();
  await next();

  ctx.set("X-Response-Time", `${Date.now() - start}ms`);
};

exports.errorLogger = (error, ctx) => {
  ctx.logger(`${error.status}: ${error.message}`, "red");
};
