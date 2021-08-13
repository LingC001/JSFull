module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  globals: {
    AMap: false
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "warn",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn"
  }
};
