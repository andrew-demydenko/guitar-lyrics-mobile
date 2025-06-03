import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import React from "react";
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import darkTheme from "@/themes/darkTheme";
import lightTheme from "@/themes/lightTheme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { colorScheme } = useColorScheme();

  const navigationTheme = colorScheme === "dark" ? darkTheme : lightTheme;
  const paperTheme = colorScheme === "dark" ? MD3DarkTheme : MD3LightTheme;

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>
    </NavigationThemeProvider>
  );
};
