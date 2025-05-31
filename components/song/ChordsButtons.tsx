import { memo } from "react";
import { View } from "react-native";
import { CHORDS_BY_POPULARITY } from "@/constants/Chords";
import { ChordButton } from "./ChordButton";

interface IChordsButtons {
  selectedChord?: string;
  onSelectChord: (chord: string) => void;
}

export const ChordsButtons = memo(
  ({ selectedChord, onSelectChord }: IChordsButtons) => {
    return (
      <View className="flex flex-row flex-wrap gap-2 p-1 pr-3">
        {CHORDS_BY_POPULARITY.map((chord) => (
          <ChordButton
            key={chord}
            size="sm"
            chord={chord}
            isSelected={selectedChord === chord}
            onPress={onSelectChord}
          />
        ))}
      </View>
    );
  }
);

ChordsButtons.displayName = "ChordsButtons";
