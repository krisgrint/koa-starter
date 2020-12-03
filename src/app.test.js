const { errorLogger } = require("./middleware/logger");

jest.mock("koa", () =>
  jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    use: jest.fn(),
    context: {},
  }))
);
jest.mock("./middleware", () => () => "middleware");
jest.mock("./router", () => ({
  routes: () => "routes",
  allowedMethods: () => "allowedMethods",
}));

describe("app", () => {
  let app;

  beforeEach(() => {
    app = require("./app");
  });

  describe("app", () => {
    it("uses middleware", () => {
      expect(app.use).toHaveBeenCalledWith("middleware");
    });

    it("uses router", () => {
      expect(app.use).toHaveBeenCalledWith("routes");
      expect(app.use).toHaveBeenCalledWith("allowedMethods");
    });

    it("uses errorLogger", () => {
      expect(app.on).toHaveBeenCalledWith("error", errorLogger);
    });
  });
});
