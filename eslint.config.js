// ESLint covers the shell, the plain-JS part of the repo that demos load
// directly. The Svelte library is checked by svelte-check.
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/*", "!shell/", "!shell/**"] },
  {
    files: ["shell/**/*.{js,ts}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
);
