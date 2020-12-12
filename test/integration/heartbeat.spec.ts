import request from "supertest";
import app from "../../src/app";

const server = app.listen();

describe("GET /heartbeat", () => {
  afterAll(() => server.close());

  it("responds with json", async () => {
    const response = await request(server)
      .get("/heartbeat")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toStrictEqual({ message: "Service is up" });
  });
});
