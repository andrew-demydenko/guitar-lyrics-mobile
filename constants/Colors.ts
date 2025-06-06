import * as TWColors from "tailwindcss/colors";

const { lightBlue, warmGray, trueGray, coolGray, blueGray, ...filteredColors } =
  TWColors;

export const Colors = {
  ...filteredColors,
  light: {
    background: filteredColors.neutral[50],
    card: filteredColors.stone[100],
    text: filteredColors.stone[800],
    border: filteredColors.gray[800],
    notification: filteredColors.gray[800],
    active: filteredColors.cyan[600],
    primary: filteredColors.blue[500],
    secondary: filteredColors.gray[400],
    danger: filteredColors.red[400],
    warning: filteredColors.amber[300],
    success: filteredColors.green[500],
    info: filteredColors.teal[600],
  },

  dark: {
    background: filteredColors.gray[600],
    card: filteredColors.stone[900],
    text: filteredColors.neutral[50],
    border: filteredColors.neutral[200],
    notification: filteredColors.neutral[100],
    active: filteredColors.cyan[600],
    primary: filteredColors.blue[500],
    secondary: filteredColors.gray[400],
    danger: filteredColors.red[400],
    warning: filteredColors.amber[300],
    success: filteredColors.green[500],
    info: filteredColors.teal[600],
  },
};
