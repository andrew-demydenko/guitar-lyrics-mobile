import React from "react";
import { ScrollView, ActivityIndicator } from "react-native";
import { SongItem } from "@/components/song/SongItem";
import { View, Text } from "@/components/ui";
import { useSharedSongs } from "@/hooks/data";

export default function FavoritesPage() {
  const { data: songs = [], isLoading } = useSharedSongs();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1 p-4">
        {songs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
        {songs.length === 0 && (
          <View className="flex-1 items-center justify-center py-8">
            <Text className="text-gray-500 dark:text-gray-400">
              У вас пока нет песен
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
