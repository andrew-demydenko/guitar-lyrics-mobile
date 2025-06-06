import cn from "classnames";
import { useCallback } from "react";
import { Text } from "react-native";
import { Button } from "../ui/Button";

interface IChordButton {
  onPress?: (...args: any[]) => void;
  onLongPress?: (...args: any[]) => void;
  chord: string;
  isSelected?: boolean;
  size?: "sm" | "md" | "lg";
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
      className={cn("ml-1 px-0 min-w-0", {
        "py-0": !size,
      })}
    >
      <Text className="text-base/4.5">{chord}</Text>
    </Button>
  );
};
