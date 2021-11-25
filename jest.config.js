/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  verbose: true,
  clearMocks: true,
  projects: [
    {
      displayName: "Browser",
      testEnvironment: "jsdom",
      rootDir: "./",
      testMatch: ["<rootDir>/__tests__/**/*.[jt]s"],
      testURL: "http://localhost",
      moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
      },
    },
  ],
};