import { GROUPED_CHORDS } from "@/constants/Chords";
import { ChordPositions, ChordPosition } from "@/entities/song";

const getChordIndex = (
  chord: string,
): { group: string[]; index: number } | null => {
  for (const group of Object.values(GROUPED_CHORDS)) {
    const index = group.indexOf(chord);
    if (index !== -1) return { group, index };
  }
  return null;
};

export const transposeChord = (chord: string, steps: number): string => {
  const data = getChordIndex(chord);
  if (!data || data.index === null) return chord;
  const newIndex = (data.index + steps + data.group.length) % data.group.length;

  return data.group[newIndex];
};

export const transposeLyricChords = (chords: ChordPositions, steps: number) => {
  const newChords: ChordPositions = chords.map((chord: ChordPosition) => {
    return [...chord];
  });
  newChords.forEach((chord: ChordPosition) => {
    chord[1] = transposeChord(chord[1], steps);
  });

  return newChords;
};
