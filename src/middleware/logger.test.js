describe("logger", () => {
  let requestLogger;
  let requestTimer;
  let errorLogger;
  const OLD_ENV = process.env;

  const next = jest.fn();
  const logger = jest.fn();
  const set = jest.fn();
  const response = {
    get: jest.fn(),
  };
  const ctx = {
    method: "GET",
    url: "/test",
    status: 200,
    logger,
    set,
    response,
  };

  describe("request logger", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      process.env = { ...OLD_ENV };
    });

    it("logs when in a development environment", async () => {
      process.env.NODE_ENV = "development";
      response.get.mockImplementation(() => "mockResponseTime");
      requestLogger = require("./logger").requestLogger;

      await requestLogger(ctx, next);

      expect(next).toHaveBeenCalled();
      expect(response.get).toHaveBeenCalledWith("X-Response-Time");
      expect(logger).toHaveBeenCalledWith(
        "GET: 200 /test mockResponseTime",
        expect.anything()
      );
    });

    it("does not log whilst in any other environment", async () => {
      requestLogger = require("./logger").requestLogger;

      await requestLogger(ctx, next);

      expect(next).toHaveBeenCalled();
      expect(logger).not.toHaveBeenCalled();
    });
  });

  describe("request timer", () => {
    it("sets a response header with the calculated request time", async () => {
      jest.spyOn(Date, "now").mockImplementationOnce(() => 1607201024900);
      jest.spyOn(Date, "now").mockImplementationOnce(() => 1607201024902);
      requestTimer = require("./logger").requestTimer;

      await requestTimer(ctx, next);

      expect(next).toHaveBeenCalled();
      expect(set).toHaveBeenCalledWith("X-Response-Time", "2ms");
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
