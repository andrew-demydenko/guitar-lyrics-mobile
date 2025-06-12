import { Link } from "expo-router";
import { cssInterop } from "nativewind";
import React from "react";
import { Card } from "react-native-paper";
import { style } from "twrnc";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Song } from "@/entities/song";
interface SongItemProps {
  song: Song;
}

const StyledCard = cssInterop(Card, {
  className: "style",
});

export const SongItem = ({ song }: SongItemProps) => {
  return (
    <Link href={`/song/${song.id}`} asChild>
      <StyledCard className="mb-4 !bg-card">
        <Card.Title
          title={song.name}
          subtitle={song.author}
          subtitleStyle={style("text-gray-500 dark:text-white")}
          right={() => (
            <IconSymbol
              style={style("mr-2")}
              name="chevron.right"
              size={20}
              color="secondary"
            />
          )}
        />
      </StyledCard>
    </Link>
  );
};
