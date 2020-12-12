import chalk from "chalk";

export default (logger: Console) => (
  message: string,
  color = "white"
): void => {
  logger.log(chalk.keyword(color)(message));
};
