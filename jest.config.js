module.exports = {
  testEnvironment: "node",
  testPathIgnorePatterns: ["test/integration"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
};
