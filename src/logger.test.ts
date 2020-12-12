/* eslint-disable @typescript-eslint/no-explicit-any */
import chalk from "chalk";
import Logger from "./logger";

const chalkSpy = jest.fn();
jest.mock("chalk", () => ({
  keyword: jest.fn(() => chalkSpy),
}));

describe("logger", () => {
  const consoleSpy: any = {
    log: jest.fn(),
  };
  let logger: any;

  beforeEach(() => {
    logger = Logger(consoleSpy);
  });

  it("exports a function", () => {
    expect(logger).toBeInstanceOf(Function);
  });

  it("calls chalk with a default color", () => {
    logger("default message");

    expect(consoleSpy.log).toHaveBeenCalled();
    expect(chalk.keyword).toHaveBeenCalledWith("white");
    expect(chalkSpy).toHaveBeenCalledWith("default message");
  });

  it("calls chalk with a defined color", () => {
    logger("blue message", "blue");

    expect(consoleSpy.log).toHaveBeenCalled();
    expect(chalk.keyword).toHaveBeenCalledWith("blue");
    expect(chalkSpy).toHaveBeenCalledWith("blue message");
  });
});
