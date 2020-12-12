import errorLogger from "./utils/error-logger";
import app from "./app";

jest.mock("koa", () =>
  jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    use: jest.fn(),
    context: {},
  }))
);
jest.mock("./router", () => ({
  routes: () => "routes",
  allowedMethods: () => "allowedMethods",
}));

describe("app", () => {
  describe("app", () => {
    it("uses router", () => {
      expect(app.use).toHaveBeenCalledWith("routes");
      expect(app.use).toHaveBeenCalledWith("allowedMethods");
    });

    it("attaches logger to the context prototype", () => {
      expect(app.context.logger).toBeDefined();
    });

    it("uses errorLogger", () => {
      expect(app.on).toHaveBeenCalledWith("error", errorLogger);
    });
  });
});
