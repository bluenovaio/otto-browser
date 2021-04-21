import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  testMatch: [
    '**/__tests__/**/*.ts?(x)'
  ],
  testPathIgnorePatterns: [
    'dist'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: ['./src/**/*'],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 71.93,
      lines: 59.41,
      statements: 60.66
    }
  }
};

export default config;
