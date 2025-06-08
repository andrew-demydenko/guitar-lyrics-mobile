// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight } from "expo-symbols";
import { useColorScheme } from "nativewind";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];
type IconMapping = Record<
  | "house.fill"
  | "paperplane.fill"
  | "chevron.left.forwardslash.chevron.right"
  | "chevron.right"
  | "music.note.list"
  | "magnifyingglass"
  | "heart.fill"
  | "plus"
  | "minus"
  | "gearshape.fill"
  | "xmark"
  | "backspace"
  | "pause"
  | "play.fill"
  | "chevron.backward"
  | "pencil",
  MaterialIconName
>;
type IconSymbolName = keyof IconMapping;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "music.note.list": "library-music",
  magnifyingglass: "search",
  "heart.fill": "favorite",
  plus: "add",
  minus: "remove",
  "gearshape.fill": "settings",
  xmark: "close",
  backspace: "backspace",
  pause: "pause",
  "play.fill": "play-arrow",
  "chevron.backward": "arrow-back",
  pencil: "edit",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */

export const useInverColor = (
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

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  invertColor = true,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  invertColor?: boolean;
}) {
  const finalColor = useInverColor(invertColor, color);

  return (
    <MaterialIcons
      color={finalColor}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
