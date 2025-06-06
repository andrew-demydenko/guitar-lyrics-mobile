import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Platform, ActivityIndicator } from "react-native";
import { SongView } from "@/components/song/SongView";
import { ScrollWrapper } from "@/components/song/SongWrapper";
import { View, Button } from "@/components/ui";
import { useSongById } from "@/hooks/data";

export default function SongsPage() {
  const { songId } = useLocalSearchParams();
  const navigation = useNavigation();
  const { data: song, isLoading } = useSongById(songId as string);

  useEffect(() => {
    navigation.setOptions({
      title: song ? `${song.name} - ${song.author}` : "Song",
      headerRight: () => (
        <Button
          className={Platform.select({
            ios: "mr-0",
            default: "mr-4",
          })}
          size="sm"
          href={`/song/edit/${songId}`}
        >
          Edit Song
        </Button>
      ),
    });
  }, [navigation, songId, song]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
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
