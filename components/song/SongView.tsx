import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { ChordPositions, Song } from "@/entities/song";
import { transposeLyricsChords } from "@/lib/song";
import { SongLine } from "./SongLine";

export const SongView = ({
  song,
  toneKey,
  fontSize = 16,
  ...props
}: {
  song: Pick<Song, "text" | "chordPositions">;
  toneKey?: number;
  fontSize?: number;
  handleAddChord?: (line: string, charIndex: number) => void;
  handleRemoveChord?: (line: string, charIndex: number) => void;
  handleChordsRiff?: (chords: string[], lineIndex: number) => void;
}) => {
  const { text, chordPositions } = song;
  const [textByLines, setTextByLines] = useState<string[]>([]);
  const [transposedChords, setTransposeChords] = useState<ChordPositions>(
    () => chordPositions
  );

  useEffect(() => {
    setTextByLines(text ? text.split("\n") : []);
  }, [text]);

  useEffect(() => {
    if (typeof toneKey !== "undefined") {
      setTransposeChords(transposeLyricsChords(chordPositions, toneKey));
    }
  }, [toneKey, chordPositions]);

  useEffect(() => {
    setTransposeChords(chordPositions);
  }, [chordPositions]);

  if (!text) {
    return null;
  }

  return (
    <View className="mt-6 ml-4 relative">
      <ScrollView>
        {textByLines.map((line, lineIndex) => {
          return (
            <SongLine
              key={lineIndex}
              line={line}
              lineIndex={lineIndex}
              transposedChords={transposedChords}
              fontSize={fontSize}
              {...props}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
