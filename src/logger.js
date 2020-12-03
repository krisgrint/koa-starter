const chalk = require("chalk");

module.exports = (logger) => (message, color = "white") => {
  logger.log(chalk[color](message));
};
