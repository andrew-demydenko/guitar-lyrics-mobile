import { useRouter } from "expo-router";
import { TouchableOpacity, Platform } from "react-native";
import { IconSymbol } from "./IconSymbol";

interface BackButtonProps {
  onPress?: () => void;
  size?: number;
  className?: string;
}

export function BackButton({
  onPress,
  size = 24,
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const marginClassName = Platform.select({
    ios: "ml-0",
    default: "ml-4",
  });

  return (
    <TouchableOpacity
      className={`${marginClassName} ${className}`.trim()}
      onPress={handlePress}
    >
      <IconSymbol name="chevron.backward" size={size} color="black" />
    </TouchableOpacity>
  );
}
