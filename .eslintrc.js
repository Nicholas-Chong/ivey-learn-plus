module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
  },
  extends: ["standard", "prettier"],
  plugins: ["prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": ["error"],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "linebreak-style": ["error", process.platform === "darwin" ? "unix" : "windows"],
  },
};
