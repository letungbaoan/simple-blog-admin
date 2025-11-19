/**
 * @type {import('jest').Config}
 */
const config = {
  testEnvironment: 'jsdom',

  testMatch: ['**/tests/**/*.(test|spec).(js|jsx|ts|tsx)'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/$1',
    '^next/image$': require.resolve('./__mocks__/next-image.js'),
    '^next/link$': require.resolve('./__mocks__/next-link.js')
  },

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },

  testPathIgnorePatterns: ['/node_modules/', '/.next/']
}

module.exports = config
