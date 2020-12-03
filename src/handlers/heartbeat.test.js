describe("heartbeat", () => {
  let heartbeat;

  const ctx = {
    status: null,
  };

  it("sets the status of the context to 200", async () => {
    heartbeat = require("./heartbeat");

    heartbeat(ctx);

    expect(ctx.status).toBe(200);
  });
});
