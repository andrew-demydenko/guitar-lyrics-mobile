import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";
import { StyleProp, ViewStyle } from "react-native";
import { useInvertColor } from "@/hooks/useInvertColor";

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
  invertColor = true,
}: {
  name: SymbolViewProps["name"];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
  invertColor?: boolean;
}) {
  const finalColor = useInvertColor(invertColor, color);

  return (
    <SymbolView
      weight={weight}
      tintColor={finalColor}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
