module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "prettier",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    requireConfigFile: false,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "@typescript-eslint/no-unused-vars": "off",
    "vue/multi-word-component-names": "off",
  },
};
