import { Theme, DarkTheme } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";

const darkTheme: Theme = {
  ...DarkTheme,
  dark: true,
  colors: Colors.dark,
};

export default darkTheme;
