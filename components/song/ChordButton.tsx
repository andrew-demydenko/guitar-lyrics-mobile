import { useCallback } from "react";
import { Text } from "react-native";
import { Button } from "../ui/Button";

interface IChordButton {
  onPress?: (...args: any[]) => void;
  onLongPress?: (...args: any[]) => void;
  chord: string;
  isSelected?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

export const ChordButton = ({
  isSelected,
  onPress,
  onLongPress,
  chord,
  size,
}: IChordButton) => {
  const handlePress = useCallback(() => {
    onPress && onPress(chord);
  }, [chord, onPress]);

  const handleLongPress = useCallback(() => {
    onLongPress && onLongPress(chord);
  }, [chord, onLongPress]);

  return (
    <Button
      mode="outlined"
      onLongPress={handleLongPress}
      onPress={handlePress}
      isActive={isSelected}
      size={size}
    >
      <Text className="text-base/4.5">{chord}</Text>
    </Button>
  );
};
