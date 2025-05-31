import { useCallback, memo } from "react";
import { Pressable, Text, View } from "react-native";
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
        <View className="absolute bottom-6 left-0 w-[75px]">
          <View className="flex-row items-center">
            {removeChord ? (
              <ChordButton onLongPress={handleRemoveChord} chord={chord[1]} />
            ) : (
              <Text style={{ fontSize }} className="text-red-500">
                {chord[1]}
              </Text>
            )}
          </View>
        </View>
      )}

      {addChord ? (
        <Pressable onPress={handleAddChord}>
          <Text className={`text-black text-lg`}>
            {char.trim() ? char : "\u00A0"}
          </Text>
        </Pressable>
      ) : (
        <Text style={{ fontSize }} className={`text-black `}>
          {char.trim() ? char : "\u00A0"}
        </Text>
      )}
    </View>
  );
};

export const SongChar = memo(SongCharComponent);
