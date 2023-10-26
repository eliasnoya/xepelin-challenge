module.exports = {
  preset: "ts-jest",
  verbose: false,
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$",
};
