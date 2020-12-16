import heartbeat from "./heartbeat";
import { createMockContext } from "@shopify/jest-koa-mocks";
import { Context } from "koa";

describe("heartbeat", () => {
  let ctx: Context;

  beforeEach(() => {
    ctx = createMockContext();
  });

  it("sets the status of the context to 200", async () => {
    await heartbeat(ctx);

    expect(ctx.status).toBe(200);
  });
});
