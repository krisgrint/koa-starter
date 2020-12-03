describe("handlers", () => {
  let handlers;

  beforeEach(() => {
    handlers = require("./index");
  });

  it("exports an object", () => {
    expect(handlers).toBeInstanceOf(Object);
  });

  it("exports a heartbeat handler", () => {
    expect(handlers.heartbeat).toBeInstanceOf(Function);
  });
});
