// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // node:fs, path
            "external", // react, expo-font, etc.
            "internal", // алиасы типа @/ или src/
            "parent", // ../
            "sibling", // ./
            "index", // './index'
            "object", // импорт из объектов (редко используется)
            "type", // только типы (TypeScript)
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
            {
              pattern: "src/**",
              group: "internal",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);
