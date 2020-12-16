import http from "http";
import app from "./app";
import logger from "./logger";
import { AddressInfo } from "net";

const server = http.createServer(app.callback()).listen(process.env.PORT || 0);
const { port } = server.address() as AddressInfo;
const initializedLogger = logger(console);

server.on("listening", () => {
  initializedLogger(`Server listening on port: ${port}`, "gray");
});

process.on("SIGTERM", () => {
  initializedLogger("Closing server", "magenta");
  server.close(() => {
    initializedLogger("Server closed", "bgMagenta");
    process.exit(0);
  });
});
