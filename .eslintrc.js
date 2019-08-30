module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    // note you must disable the base rule as it can report incorrect errors
    indent: "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowTypedFunctionExpressions: true
      }
    ],
    "react/prop-types": "off",
    // note you must disable the base rule as it can report incorrect errors
    semi: "off",
    "@typescript-eslint/semi": ["error", "never"]
  }
};
