import errorHandler from "./error-handler";
import { createMockContext } from "@shopify/jest-koa-mocks";
import { Context } from "koa";

interface ResponseError extends Error {
  status?: number;
}

describe("error handler", () => {
  const next = jest.fn();
  let ctx: Context;
  let error: ResponseError;

  beforeEach(() => {
    jest.clearAllMocks();
    ctx = createMockContext();
    ctx.app.emit = jest.fn();
  });

  it("handles undefined errors as 500", async () => {
    error = new Error();
    next.mockRejectedValue(error);

    await errorHandler(ctx, next);

    expect(ctx.status).toBe(500);
    expect(ctx.body).toStrictEqual({ errors: ["Internal Server Error"] });
    expect(ctx.app.emit).toHaveBeenCalledWith(
      "error",
      "500: Internal Server Error",
      ctx
    );
  });

  it("handles error with status code", async () => {
    error = new Error("Not Found");
    error.status = 404;
    next.mockRejectedValue(error);

    await errorHandler(ctx, next);

    expect(ctx.status).toBe(404);
    expect(ctx.body).toStrictEqual({ errors: ["Not Found"] });
    expect(ctx.app.emit).toHaveBeenCalledWith("error", "404: Not Found", ctx);
  });
});
