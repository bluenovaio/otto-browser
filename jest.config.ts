import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  testMatch: [
    '**/__tests__/**/*.test.ts'
  ],
  testPathIgnorePatterns: [
    'dist'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  collectCoverageFrom: ['./src/**/*']
};

export default config;
