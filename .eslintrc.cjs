module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-underscore-dangle': 'off', // Need underscore to reference mongo _id
    'react/require-default-props': ['error', { functions: 'defaultArguments' }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@components', './src/components'],
          ['@utils', './src/utils'],
          ['@pages', './src/pages'],
          ['@hooks', './src/hooks'],
          ['@propTypes', './src/propTypes'],
          ['@assets', './src/assets'],
        ],
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
