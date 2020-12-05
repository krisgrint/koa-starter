const compose = require("koa-compose");
const errorHandler = require("./error-handler");
const { requestLogger, requestTimer } = require("./logger");

jest.mock("koa-compose");
jest.mock("koa-helmet", () => () => "koa-helmet");
jest.mock("@koa/cors", () => () => "@koa/cors");
jest.mock("koa-bodyparser", () => () => "koa-bodyparser");

describe("middleware", () => {
  let middleware;

  beforeEach(() => {
    middleware = require("./index");
  });

  it("exports a composed function of middleware", () => {
    middleware();

    expect(compose).toHaveBeenCalledWith([
      requestLogger,
      requestTimer,
      errorHandler,
      "koa-helmet",
      "@koa/cors",
      "koa-bodyparser",
    ]);
  });
});
