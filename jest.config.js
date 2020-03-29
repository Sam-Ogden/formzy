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
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
    '!packages/**/src/**/index.ts',
    '!packages/**/src/stories/*'
  ]
};
