const http = require("http");
const app = require("./src/app");
const logger = require("./src/logger")(console);

const server = http.createServer(app.callback()).listen(process.env.PORT || 0);
const { port } = server.address();

server.on("listening", () => {
  logger(`Server listening on port: ${port}`, "white");
});
