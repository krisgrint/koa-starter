import { Context } from "koa";
import { createMockContext } from "@shopify/jest-koa-mocks";
import { requestLogger, requestTimer } from "./request-logger";

describe("logger", () => {
  const OLD_ENV = process.env;
  const next = jest.fn();
  next.mockResolvedValue(true);

  let ctx: Context;

  beforeEach(() => {
    jest.clearAllMocks();
    ctx = createMockContext();
    ctx.app.emit = jest.fn();
    ctx.set = jest.fn();
    ctx.logger = jest.fn();
  });

  describe("request logger", () => {
    beforeEach(() => {
      process.env = { ...OLD_ENV };
    });

    it("logs when in a development environment", async () => {
      process.env.NODE_ENV = "development";
      ctx.status = 200;
      ctx.url = "/test";
      jest.spyOn(ctx.response, "get").mockReturnValue("2ms");

      await requestLogger(ctx, next);

      expect(next).toHaveBeenCalled();
      expect(ctx.response.get).toHaveBeenCalledWith("X-Response-Time");
      expect(ctx.logger).toHaveBeenCalledWith(
        "GET: 200 /test 2ms",
        expect.anything()
      );
    });

    it("removes query parameters from URL", async () => {
      process.env.NODE_ENV = "development";
      ctx.status = 200;
      ctx.url = "/test?secret_token=aaabbbccc";

      await requestLogger(ctx, next);
      expect(
        ctx.logger.mock.calls[0][0].includes("secret_token=aaabbbccc")
      ).toBe(false);
    });

    it("does not log whilst in any other environment", async () => {
      await requestLogger(ctx, next);

      expect(next).toHaveBeenCalled();
      expect(ctx.logger).not.toHaveBeenCalled();
    });
  });

  describe("request timer", () => {
    it("sets a response header with the calculated request time", async () => {
      jest.spyOn(Date, "now").mockImplementationOnce(() => 1607201024900);
      jest.spyOn(Date, "now").mockImplementationOnce(() => 1607201024902);

      await requestTimer(ctx, next);

      expect(next).toHaveBeenCalled();
      expect(ctx.set).toHaveBeenCalledWith("X-Response-Time", "2ms");
    });
  });
});
