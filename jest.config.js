module.exports = {
  moduleDirectories: ['node_modules', 'packages/test-utils', __dirname],

  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json'
    }
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  testPathIgnorePatterns: ['/node_modules/', 'cypress'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  },
  coveragePathIgnorePatterns: ['/node_modules/', 'cypress'],
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
    '!packages/**/src/**/index.ts',
    '!packages/**/src/stories/*'
  ]
};
