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
        <Button mode="outlined" size="xs" onLongPress={handleRemoveChord}>
          <Text style={{ fontSize }}>{chord[1]}</Text>
        </Button>
      ) : (
        <Text style={{ fontSize }} className="text-red-500">
          {chord[1]}
        </Text>
      )}
    </View>
  );
};
