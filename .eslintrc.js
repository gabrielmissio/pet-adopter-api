module.exports = {
    root: true,
    env: {
        commonjs: true,
        es2021: true,
        node: true
    },
    globals: {
        expect: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12
    },
    plugins: [
        'react'
    ],
    rules: {
        'generator-star-spacing': 'off',
        'semi': [2, 'always'],
        'space-before-function-paren': [2, 'never'],
        'new-cap': 0,
    }
};
