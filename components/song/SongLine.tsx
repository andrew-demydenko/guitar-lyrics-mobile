import { useCallback } from "react";
import { View, Text } from "react-native";
import { CHORDS } from "@/constants/Chords";
import { ChordPositions } from "@/entities/song";
import { ChordRiffPicker } from "./ChordsRiffPicker";
import { LineOutChord } from "./LineOutChord";
import { SongChar } from "./SongChar";
import { isChordsRiff, isNotLyricLine } from "./utils";

interface ISongLine {
  line: string;
  fontSize: number;
  lineIndex: number;
  transposedChords: ChordPositions;
  editable: boolean;
  handleAddChord?: (line: string, charIndex: number) => void;
  handleRemoveChord?: (line: string, charIndex: number) => void;
  handleChordsRiff?: (chords: typeof CHORDS, lineIndex: number) => void;
}

export const SongLine = ({
  line,
  transposedChords,
  handleRemoveChord,
  handleAddChord,
  handleChordsRiff,
  lineIndex,
  fontSize,
  editable,
}: ISongLine) => {
  const chordsOnLineOut = transposedChords.filter(
    (chord) => chord[2] === line && line.length < chord[0]
  );

  const removeChord = useCallback(
    (charIndex: number) => {
      if (!handleRemoveChord) return;
      handleRemoveChord(line, charIndex);
    },
    [handleRemoveChord, line]
  );

  const addChord = useCallback(
    (charIndex: number) => {
      if (!handleAddChord) return;
      handleAddChord(line, charIndex);
    },
    [line, handleAddChord]
  );

  if (!line.trim() || isChordsRiff(line)) {
    const chords = line.split(" ").filter((c) => CHORDS.includes(c));

    return (
      <View className="my-2 flex-row items-center">
        {handleChordsRiff && (
          <View className="mr-2">
            <ChordRiffPicker
              chordsRiff={chords}
              onSave={(chords: any) => {
                handleChordsRiff(chords, lineIndex);
              }}
            />
          </View>
        )}

        {chords.length ? (
          chords.map((chord, index) => (
            <Text
              key={`chord-${index}`}
              style={{ fontSize }}
              className="text-red-500 font-bold mr-2"
            >
              {chord}
            </Text>
          ))
        ) : (
          <Text>{"\u00A0"}</Text>
        )}
      </View>
    );
  }

  if (isNotLyricLine(line)) {
    return (
      <Text key={lineIndex} className="mb-2">
        {line}
      </Text>
    );
  }

  return (
    <View key={lineIndex} className="relative mb-2">
      <View style={{ marginTop: fontSize + 4 }}>
        <View className="flex-row flex-wrap">
          {line.split("").map((char, charIndex) => {
            const chord = transposedChords.find(
              (c) => c[0] === charIndex && c[2] === line
            );

            return (
              <View key={charIndex} className="relative">
                <SongChar
                  fontSize={fontSize}
                  char={char}
                  chord={chord}
                  charIndex={charIndex}
                  addChord={editable ? addChord : undefined}
                  removeChord={editable ? removeChord : undefined}
                />
              </View>
            );
          })}
        </View>

        {chordsOnLineOut.length > 0 && (
          <View className="flex-row mt-2">
            {chordsOnLineOut.map((chord) => {
              return (
                <LineOutChord
                  key={`chord-${chord[0]}-${chord[1]}-${chord[2]}`}
                  chord={chord}
                  fontSize={fontSize}
                  removeChord={editable ? removeChord : undefined}
                />
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};
