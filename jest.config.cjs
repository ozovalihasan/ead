/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^zustandStore/(.*)$': '<rootDir>/src/zustandStore/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
  },
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.ts"
 ],
};