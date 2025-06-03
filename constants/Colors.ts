/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import TWColors from "tailwindcss/colors";

console.log(TWColors);

export const Colors = {
  light: {
    primary: TWColors.gray[800],
    background: TWColors.neutral[50],
    card: TWColors.stone[100],
    text: TWColors.stone[800],
    border: TWColors.gray[800],
    notification: TWColors.gray[800],
    active: TWColors.cyan[600],
    secondary: TWColors.gray[400],
  },

  dark: {
    primary: TWColors.neutral[100],
    background: TWColors.gray[600],
    card: TWColors.stone[900],
    text: TWColors.neutral[50],
    border: TWColors.neutral[200],
    notification: TWColors.neutral[100],
    active: TWColors.cyan[600],
    secondary: TWColors.gray[400],
  },
};
