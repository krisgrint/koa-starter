module.exports = (ctx) => {
  ctx.status = 200;
  ctx.body = {
    message: "Service is up",
  };
};
