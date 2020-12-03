module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const status = err.status || 500;
    const message = err.message || "Unknown Error";

    ctx.status = status;
    ctx.body = { errors: [message] };

    ctx.app.emit("error", `${status}: ${message}`, ctx);
  }
};
