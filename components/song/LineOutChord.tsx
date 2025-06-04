import { useCallback } from "react";
import { View, Text, Button } from "@/components/ui";
import { ChordPosition } from "@/entities/song";

interface ILineOutChord {
  chord: ChordPosition;
  fontSize: number;
  removeChord?: (charIndex: number) => void;
}

export const LineOutChord = ({
  chord,
  fontSize = 16,
  removeChord,
}: ILineOutChord) => {
  const handleRemoveChord = useCallback(
    () => removeChord && removeChord(chord[0]),
    [chord, removeChord]
  );

  return (
    <View className="flex-row items-center mr-2">
      {removeChord ? (
        <Button
          variant="outline"
          onLongPress={handleRemoveChord}
          className="ml-1 py-0 px-1"
        >
          <Text className="text-base/4.5">{chord[1]}</Text>
        </Button>
      ) : (
        <Text className={`text-red-500 text-[${fontSize}px]`}>{chord[1]}</Text>
      )}
    </View>
  );
};
