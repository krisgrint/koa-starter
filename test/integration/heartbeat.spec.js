const request = require("supertest");
const app = require("../../src/app");

const server = app.callback();

describe("GET /heartbeat", () => {
  it("responds with json", async () => {
    await request(server)
      .get("/heartbeat")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
