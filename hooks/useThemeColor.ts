import { useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";

export function useThemeColor() {
  const theme = useColorScheme() || "light";

  return {
    getColor: (
      colorName: keyof typeof Colors.light & keyof typeof Colors.dark
    ) => Colors[theme][colorName],
  };
}
