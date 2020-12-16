import errorLogger from "./error-logger";
import { ResponseError } from "./types";
import { createMockContext } from "@shopify/jest-koa-mocks";

describe("error logger", () => {
  const ctx = createMockContext();
  ctx.logger = jest.fn();

  it("logs an error message", () => {
    const error: ResponseError = new Error("some error");
    error.status = 400;

    errorLogger(error, ctx);

    expect(ctx.logger).toHaveBeenCalledWith("400: some error", "red");
  });
});
