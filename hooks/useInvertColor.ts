import { useColorScheme } from "nativewind";
import { OpaqueColorValue } from "react-native";
import { useThemeColor } from "./useThemeColor";

export const useInvertColor = (
  invertColor: boolean,
  color: string | OpaqueColorValue
) => {
  const { getThemeColor } = useThemeColor();
  const { colorScheme } = useColorScheme();
  let finalColor = color;

  if (invertColor && colorScheme === "dark" && typeof color === "string") {
    const textColor = getThemeColor("text");
    const invertedTextColor = getThemeColor("invertedText");
    const colorMap: Record<string, string> = {
      invertedTextColor: textColor,
      textColor: invertedTextColor,
      black: "white",
      white: "black",
    };

    if (colorMap[color]) {
      finalColor = colorMap[color];
    }
  }

  return finalColor;
};
