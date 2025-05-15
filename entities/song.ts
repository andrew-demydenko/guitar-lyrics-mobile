import { CHORDS } from "@/constants/Chords";

export type ChordPosition = [number, (typeof CHORDS)[number], string];
export type ChordPositions = ChordPosition[];

export interface Song {
  id: string;
  name: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  chords: string;
  text: string;
  shared: boolean;
  userId: string;
  chordPositions: ChordPositions;
  user: {
    name: string;
  };
}
