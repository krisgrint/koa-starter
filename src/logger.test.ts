import chalk from "chalk";
import Logger from "./logger";

const chalkSpy = jest.fn();
jest.mock("chalk", () => ({
  keyword: jest.fn(() => chalkSpy),
}));

describe("logger", () => {
  jest.spyOn(console, "log");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let logger: any;

  beforeEach(() => {
    logger = Logger(console);
  });

  it("exports a function", () => {
    expect(logger).toBeInstanceOf(Function);
  });

  it("calls chalk with a default color", () => {
    logger("default message");

    expect(console.log).toHaveBeenCalled();
    expect(chalk.keyword).toHaveBeenCalledWith("white");
    expect(chalkSpy).toHaveBeenCalledWith("default message");
  });

  it("calls chalk with a defined color", () => {
    logger("blue message", "blue");

    expect(console.log).toHaveBeenCalled();
    expect(chalk.keyword).toHaveBeenCalledWith("blue");
    expect(chalkSpy).toHaveBeenCalledWith("blue message");
  });
});
