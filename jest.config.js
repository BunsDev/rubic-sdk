module.exports = {
  preset: 'ts-jest',
  roots: [
    "src", "__tests__"
  ],
  setupFiles: ["./__tests__/env.js"],
  moduleDirectories: ['node_modules', '<root-dir>/src'],
  testEnvironment: 'node',
  transform: {
    "node_modules/(ethereum-cryptography)/.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: [ 'node_modules/((?!ethereum-cryptography)/.*)'],
  testMatch: ["**/__tests__/unit-tests/features/tokens/tokens-manager.spec.ts"],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  },
  moduleNameMapper: {
    '^src/(.*)$': '<root-dir>/../../src/$1',
    '@core/(.*)$': '<root-dir>/../../src/core/$1',
    '@common/(.*)$': '<root-dir>/../../src/common/$1',
    '@features/(.*)$': '<root-dir>/../../src/features/$1',
    '__tests__/(.*)$': '<root-dir>/../../__tests__/$1',

  }
};
