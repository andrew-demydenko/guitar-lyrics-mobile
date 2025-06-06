import { useCallback, memo } from "react";
import { Pressable } from "react-native";
import { View, Text } from "@/components/ui";
import { ChordPosition } from "@/entities/song";
import { ChordButton } from "./ChordButton";

interface ISongChar {
  charIndex: number;
  fontSize?: number;
  chord?: ChordPosition;
  char: string;
  removeChord?: (charIndex: number) => void;
  addChord?: (charIndex: number) => void;
}

const SongCharComponent = ({
  char,
  chord,
  charIndex,
  fontSize = 16,
  removeChord,
  addChord,
}: ISongChar) => {
  const handleRemoveChord = useCallback(
    () => removeChord && removeChord(charIndex),
    [charIndex, removeChord]
  );

  const handleAddChord = useCallback(
    () => addChord && addChord(charIndex),
    [charIndex, addChord]
  );

  return (
    <View key={charIndex} className="relative">
      {chord && (
        <View
          style={{ bottom: fontSize + 5 }}
          className="absolute left-0 w-[75px]"
        >
          <View className="flex-row items-center">
            {removeChord ? (
              <ChordButton onLongPress={handleRemoveChord} chord={chord[1]} />
            ) : (
              <Text className="text-red-400" style={{ fontSize }}>
                {chord[1]}
              </Text>
            )}
          </View>
        </View>
      )}

      {addChord ? (
        <Pressable onPress={handleAddChord}>
          <Text style={{ fontSize }} className="text-text">
            {char.trim() ? char : "\u00A0"}
          </Text>
        </Pressable>
      ) : (
        <Text style={{ fontSize }} className="text-text">
          {char.trim() ? char : "\u00A0"}
        </Text>
      )}
    </View>
  );
};

export const SongChar = memo(SongCharComponent);
