/** @type {import('tailwindcss').Config} */

const { Colors } = require("./constants/Colors");

function toCssVars(obj) {
  const result = {};
  for (const key of Object.keys(obj)) {
    result[key] = `var(--color-${key})`;
  }
  return result;
}

function toBaseVars(obj, prefix = "--color") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[`${prefix}-${key}`] = value;
  }
  return result;
}

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: toCssVars(Colors.light),
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ":root": toBaseVars(Colors.light),
        ".dark": toBaseVars(Colors.dark),
      });
    },
  ],
};
