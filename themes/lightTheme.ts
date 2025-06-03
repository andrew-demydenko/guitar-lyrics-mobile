import { Theme, DefaultTheme } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

const lightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: Colors.light,
};

export default lightTheme;
