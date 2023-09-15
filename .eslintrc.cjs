module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react/recommended"],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "simple-import-sort"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "react/react-in-jsx-scope": 0,
    "react/jsx-curly-brace-presence": [1, "never"],
    "@typescript-eslint/no-unused-vars": 1,
    "react/function-component-definition": [1, { "namedComponents": "function-declaration" }],
    "react-hooks/rules-of-hooks": 1,
    "react-hooks/exhaustive-deps": 1,
    "simple-import-sort/imports": [1, {
      groups: [
        ["^react"],
        ["^@?\\w"],
        ["@/(.*)"],
        ["^[~/]"]
      ]
    }]
  }
};
