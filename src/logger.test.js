const chalk = require("chalk");

jest.mock("chalk", () => ({
  white: jest.fn(),
  blue: jest.fn(),
}));

describe("logger", () => {
  let logger;
  const consoleSpy = {
    log: jest.fn(),
  };

  beforeEach(() => {
    logger = require("./logger")(consoleSpy);
  });

  it("exports a function", () => {
    expect(logger).toBeInstanceOf(Function);
  });

  it("calls chalk with a default color", () => {
    logger("default message");

    expect(consoleSpy.log).toHaveBeenCalled();
    expect(chalk.white).toHaveBeenCalledWith("default message");
  });

  it("calls chalk with a defined color", () => {
    logger("blue message", "blue");

    expect(consoleSpy.log).toHaveBeenCalled();
    expect(chalk.blue).toHaveBeenCalledWith("blue message");
  });
});
