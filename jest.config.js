/* eslint-disable no-undef */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  collectCoverageFrom: ["src/**/*.ts"],
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["\\.data\\.test\\.ts$"], // Ignore files ending in .data.test.ts
};
