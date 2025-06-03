import { router } from "expo-router";
import React from "react";
import { Card } from "react-native-paper";
import { style } from "twrnc";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Song } from "@/entities/song";
interface SongItemProps {
  song: Song;
}

export const SongItem = ({ song }: SongItemProps) => {
  return (
    <Card
      style={style("mb-4", "bg-white", "dark:bg-gray-800")}
      onPressIn={() => router.push(`/song/${song.id}`)}
    >
      <Card.Title
        title={song.name}
        subtitle={song.author}
        subtitleStyle={style("text-gray-500 dark:text-white")}
        right={() => (
          <IconSymbol
            style={style("mr-2")}
            name="chevron.right"
            size={20}
            color="#9CA3AF"
          />
        )}
      />
    </Card>
  );
};
