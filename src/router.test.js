const Router = require("@koa/router");
const { heartbeat } = require("./handlers");

jest.mock("@koa/router");

describe("router", () => {
  let router;

  beforeEach(() => {
    router = require("./router");
  });

  it("exports a router", () => {
    expect(router).toBeInstanceOf(Router);
  });

  it("GET handler has a path /healthcheck", () => {
    expect(router.get).toHaveBeenCalledWith("/heartbeat", heartbeat);
  });
});
