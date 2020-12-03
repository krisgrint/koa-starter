exports.requestLogger = async (ctx, next) => {
  await next();
  if (process.env.NODE_ENV === "development") {
    ctx.logger(`${ctx.method}: ${ctx.status} ${ctx.url}`, "blue");
  }
};

exports.errorLogger = (error, ctx) => {
  ctx.logger(`${error.status}: ${error.message}`, "red");
};
