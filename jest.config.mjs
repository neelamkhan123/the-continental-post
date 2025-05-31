// jest.config.mjs
export default {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
    "\\.(svg|jpg|png|css|less|scss)$": "<rootDir>/app/__mocks__/fileMock.js",
  },
};
