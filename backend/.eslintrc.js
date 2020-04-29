module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "keyword-spacing": ["error", { "before": true }],
    "linebreak-style": ["error", "windows"],
  }
};