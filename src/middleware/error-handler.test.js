describe("error handler", () => {
  let errorHandler;
  let error;
  const next = jest.fn();
  const ctx = {
    status: 200,
    body: null,
    app: {
      emit: jest.fn(),
    },
  };

  it("handles error with no status code as 500", async () => {
    errorHandler = require("./error-handler");
    error = new Error("some error");
    next.mockRejectedValue(error);

    await errorHandler(ctx, next);

    expect(ctx.status).toBe(500);
    expect(ctx.body).toStrictEqual({ errors: ["some error"] });
    expect(ctx.app.emit).toHaveBeenCalledWith("error", "500: some error", ctx);
  });

  it("handles error with status code", async () => {
    errorHandler = require("./error-handler");
    error = new Error("some error");
    error.status = 404;
    next.mockRejectedValue(error);

    await errorHandler(ctx, next);

    expect(ctx.status).toBe(404);
  });

  it("handles error with no message", async () => {
    errorHandler = require("./error-handler");
    error = new Error("some error");
    error.message = undefined;
    next.mockRejectedValue(error);

    await errorHandler(ctx, next);

    expect(ctx.body).toStrictEqual({ errors: ["Unknown Error"] });
  });
});
