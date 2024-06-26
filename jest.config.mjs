export default {
  transform: { "^.+\\.m?js$": "babel-jest" },
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "**/?(*.)+(spec|test).mjs",
  ],
};
