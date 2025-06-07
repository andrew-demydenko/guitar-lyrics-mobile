import { Platform } from "react-native";
import { useThemeColor } from "./useThemeColor";

export const useHeaderStyles = () => {
  const { getThemeColor } = useThemeColor();
  const borderColor = getThemeColor("secondary");
  const backgroundColor = getThemeColor("card");

  if (Platform.OS === "web") {
    return {
      backgroundColor,
      borderBottomColor: borderColor,
      boxShadow: `0 0 10px 3px ${borderColor}`,
    };
  } else {
    return {
      backgroundColor,
      borderBottomColor: borderColor,
      borderBottomWidth: 1,
      shadowColor: borderColor,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    };
  }
};
