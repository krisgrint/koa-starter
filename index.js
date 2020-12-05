const http = require("http");
const app = require("./src/app");
const logger = require("./src/logger")(console);

const server = http.createServer(app.callback()).listen(process.env.PORT || 0);
const { port } = server.address();

server.on("listening", () => {
  logger(`Server listening on port: ${port}`, "bold");
});

process.on("SIGTERM", () => {
  logger("Closing server", "magenta");
  server.close(() => {
    logger("Server closed", "bgMagenta");
    process.exit(0);
  });
});
