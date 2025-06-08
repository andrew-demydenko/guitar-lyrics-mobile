import { useColorScheme } from "nativewind";
import { Colors } from "@/constants/Colors";

export type ThemeColorName =
  | "background"
  | "card"
  | "text"
  | "invertedText"
  | "border"
  | "notification"
  | "active"
  | "primary"
  | "secondary"
  | "danger"
  | "warning"
  | "success"
  | "info";

type Theme = "light" | "dark";

export function useThemeColor() {
  const { colorScheme = "light" } = useColorScheme();

  const getColor = (colorName: keyof typeof Colors, shade?: string): string => {
    const color = Colors[colorName];

    if (color && typeof color === "object" && shade && shade in color) {
      return (color as Record<string, string>)[shade];
    }

    return color as string;
  };

  const getThemeColor = (
    colorName: ThemeColorName
  ): (typeof Colors)[Theme][ThemeColorName] => {
    return Colors[colorScheme][colorName];
  };

  return {
    getColor,
    getThemeColor,
  };
}
