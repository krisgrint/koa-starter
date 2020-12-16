import Router from "@koa/router";
import { heartbeat } from "./handlers";
import router from "./router";

jest.mock("@koa/router");

describe("router", () => {
  it("exports a router", () => {
    expect(router).toBeInstanceOf(Router);
  });

  it("GET handler has a path /healthcheck", () => {
    expect(router.get).toHaveBeenCalledWith("/heartbeat", heartbeat);
  });
});
