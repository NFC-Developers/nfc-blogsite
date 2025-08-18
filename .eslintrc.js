module.exports = {
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { 
      vars: "all",
      args: "after-used",
      ignoreRestSiblings: true
    }],
    "@next/next/no-img-element": "warn"
  },
};
