import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SongItem } from "@/components/song/SongItem";
import { useUserSongs } from "@/hooks/data";
import { useAuthProvider } from "@/providers/AuthProvider";

export default function SongsPage() {
  const { user } = useAuthProvider();
  const { data: songs = [], isLoading } = useUserSongs(user?.id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Загрузка...</Text>
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
