describe("logger", () => {
  let requestLogger;
  let errorLogger;
  const OLD_ENV = process.env;

  const next = jest.fn();
  const logger = jest.fn();
  const ctx = {
    method: "GET",
    url: "/test",
    status: 200,
    logger,
  };

  describe("request logger", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      process.env = { ...OLD_ENV };
    });

    it("logs when in a development environment", async () => {
      process.env.NODE_ENV = "development";

      requestLogger = require("./logger").requestLogger;

      await requestLogger(ctx, next);

      expect(next).toHaveBeenCalled();
      expect(logger).toHaveBeenCalledWith("GET: 200 /test", expect.anything());
    });

    it("does not log whilst in any other environment", async () => {
      requestLogger = require("./logger").requestLogger;

      await requestLogger(ctx, next);

      expect(next).toHaveBeenCalled();
      expect(logger).not.toHaveBeenCalled();
    });
  });

  describe("error logger", () => {
    it("logs an error message", () => {
      const error = new Error("some error");
      error.status = 500;

      errorLogger = require("./logger").errorLogger;

      errorLogger(error, ctx);

      expect(logger).toHaveBeenCalledWith("500: some error", expect.anything());
    });
  });
});
