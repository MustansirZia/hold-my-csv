module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',

        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    plugins: ['react', 'react-hooks'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    ignorePatterns: ['out/**', '.next/**', 'node_modules/**'],
    rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 0,
        'no-fallthrough': 'error',
    },
    env: {
        jest: true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
