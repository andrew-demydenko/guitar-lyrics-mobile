const js = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  js.configs.recommended,
  {
    ignores: ["dist/*"],
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Встроенные модули (node:fs)
            "external", // Внешние зависимости (react, expo)
            "internal", // Абсолютные пути (@/, src/)
            "parent", // Родительские каталоги (../)
            "sibling", // Текущий каталог (./)
            "index", // Индексные файлы (./index)
            "object", // Импорты типов (type, interface)
            "type", // TypeScript типы
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
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },

          "newlines-between": "never",
          warnOnUnassignedImports: true,
        },
      ],
    },
  },
]);
