import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { SongView } from "@/components/song/SongView";
import { ScrollWrapper } from "@/components/song/SongWrapper";
import { useSongById } from "@/hooks/data";

export default function SongsPage() {
  const { songId } = useLocalSearchParams();
  const { data: song, isLoading } = useSongById(songId as string);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4">
      {song && (
        <ScrollWrapper>
          {({ toneKey, fontSize }) => (
            <SongView song={song} toneKey={toneKey} fontSize={fontSize} />
          )}
        </ScrollWrapper>
      )}
    </View>
  );
}
