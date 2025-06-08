import { useLocalSearchParams, useNavigation, router } from "expo-router";
import React, { useEffect } from "react";
import { Platform, ActivityIndicator } from "react-native";
import { IconButton } from "react-native-paper";
import { SongView } from "@/components/song/SongView";
import { ScrollWrapper } from "@/components/song/SongWrapper";
import { View, BackButton, IconSymbol } from "@/components/ui";
import { useSongById } from "@/hooks/data";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function SongsPage() {
  const { songId } = useLocalSearchParams();
  const { getThemeColor } = useThemeColor();
  const primaryColor = getThemeColor("primary");
  const navigation = useNavigation();
  const { data: song, isLoading } = useSongById(songId as string);

  useEffect(() => {
    navigation.setOptions({
      title: song ? `${song.name} - ${song.author}` : "Song",
      headerLeft: () => <BackButton />,
      headerRight: () => (
        <View
          className={Platform.select({
            ios: "mr-0",
            default: "mr-3",
          })}
        >
          <IconButton
            onPress={() => router.push(`/song/edit/${songId}`)}
            size={24}
            icon={() => <IconSymbol name="pencil" size={24} color="black" />}
          />
        </View>
      ),
    });
  }, [navigation, songId, song, primaryColor]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 p-2">
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
