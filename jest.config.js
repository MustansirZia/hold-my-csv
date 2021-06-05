module.exports = {
    testPathIgnorePatterns: [
        '<rootDir>/.next/',
        '<rootDir>/node_modules/',
        'jest.setup.js',
        '/node_modules/(?!antd|@ant-design|rc-.+?|@babel/runtime).+(js|jsx)$',
    ],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    },
    setupFilesAfterEnv: ['./__tests__/jest.setup.js'],
};
