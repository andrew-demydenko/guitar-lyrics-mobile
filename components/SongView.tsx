import React, { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { CHORDS } from "@/constants/Chords";
import { ChordPositions, Song } from "@/entities/song";
import { transposeLyricChords, transposeChord } from "@/lib/song";
import { ChordRiffPicker } from "./ChordsRiffPicker";
import { Button } from "./ui/Button";

type TEditable = {
  handleAddChord: (line: string, charIndex: number) => void;
  handleRemoveChord: (line: string, charIndex: number) => void;
  handleChordsRiff: (chords: typeof CHORDS, lineIndex: number) => void;
};

const isChordsRiff = (text: string) => {
  if (!text) return false;
  const parts = text.split(/\s+/);
  return parts.every(
    (part) => !part.trim() || ["|"].includes(part) || CHORDS.includes(part)
  );
};

const isNotLyricLine = (line: string) => {
  const keywords = ["вступление", "припев"];
  const specialSymbolsRegex = /[|(){}[\]_]|--+/;
  const keywordsRegex = new RegExp(keywords.join("|"), "i");

  return specialSymbolsRegex.test(line) || keywordsRegex.test(line);
};

export const SongView = ({
  song,
  editable,
  toneKey,
  fontSize = 16,
}: {
  song: Pick<Song, "text" | "chordPositions">;
  editable?: TEditable;
  toneKey?: number;
  fontSize?: number;
}) => {
  const { text, chordPositions } = song;
  const [textByLines, setTextByLines] = useState<string[]>([]);
  const [transposedChords, setTransposeChords] =
    useState<ChordPositions>(chordPositions);

  useEffect(() => {
    setTextByLines(text ? text.split("\n") : []);
  }, [text]);

  useEffect(() => {
    if (typeof toneKey !== "undefined") {
      setTransposeChords(transposeLyricChords(chordPositions, toneKey));
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
      {editable && (
        <Text className="mb-4 font-medium text-base">
          Нажмите на символ, чтобы добавить выбранный аккорд:
        </Text>
      )}

      <ScrollView>
        {textByLines.map((line, lineIndex) => {
          const chordsOnLineOut = transposedChords.filter(
            (chord) => chord[2] === line && line.length < chord[0]
          );

          if (!line.trim() || isChordsRiff(line)) {
            const chords = line.split(" ").filter((c) => CHORDS.includes(c));

            return (
              <View key={lineIndex} className="my-2 flex-row items-center">
                {editable && (
                  <View className="mr-2">
                    <ChordRiffPicker
                      chordsRiff={chords}
                      onSave={(chords: any) => {
                        editable.handleChordsRiff(chords, lineIndex);
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
                      {transposeChord(chord, toneKey || 0)}
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
              <View className="mt-5">
                <View className="flex-row flex-wrap">
                  {line.split("").map((char, charIndex) => {
                    const chord = transposedChords.find(
                      (c) => c[0] === charIndex && c[2] === line
                    );

                    return (
                      <View key={charIndex} className="relative">
                        {chord && (
                          <View className="absolute bottom-6 left-0 w-[75px]">
                            <View className="flex-row items-center">
                              {editable ? (
                                <Button
                                  variant="outline"
                                  onLongPress={() =>
                                    editable.handleRemoveChord(line, charIndex)
                                  }
                                  className="ml-1 py-0 px-1"
                                >
                                  <Text className="text-base/4.5">
                                    {chord[1]}
                                  </Text>
                                </Button>
                              ) : (
                                <Text
                                  style={{ fontSize }}
                                  className="text-red-500"
                                >
                                  {chord[1]}
                                </Text>
                              )}
                            </View>
                          </View>
                        )}

                        {editable ? (
                          <Pressable
                            onPress={() =>
                              editable.handleAddChord(line, charIndex)
                            }
                          >
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
                  })}
                </View>

                {chordsOnLineOut.length > 0 && (
                  <View className="flex-row mt-2">
                    {chordsOnLineOut.map((chord) => (
                      <View
                        key={`chord-${chord[0]}-${chord[1]}-${chord[2]}`}
                        className="flex-row items-center mr-2"
                      >
                        {editable ? (
                          <Button
                            variant="outline"
                            onLongPress={() =>
                              editable.handleRemoveChord(line, chord[0])
                            }
                            className="ml-1 py-0 px-1"
                          >
                            <Text className="text-base/4.5">{chord[1]}</Text>
                          </Button>
                        ) : (
                          <Text className={`text-red-500 text-[${fontSize}px]`}>
                            {chord[1]}
                          </Text>
                        )}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
