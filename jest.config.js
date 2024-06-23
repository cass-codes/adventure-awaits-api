/* eslint-disable no-undef */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"], // Adjust the pattern to match your test file locations
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
};
