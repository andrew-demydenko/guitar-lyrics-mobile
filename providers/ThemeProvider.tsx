import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import React from "react";
import { PaperProvider } from "react-native-paper";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { colorScheme } = useColorScheme();

  const navigationTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <NavigationThemeProvider value={navigationTheme}>
      <PaperProvider theme={navigationTheme}>{children}</PaperProvider>
    </NavigationThemeProvider>
  );
};
