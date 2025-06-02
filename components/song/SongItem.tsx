import { Link } from "expo-router";
import React from "react";
import { View, Text, Platform } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Song } from "@/entities/song";

interface SongItemProps {
  song: Song;
}

export const SongItem = ({ song }: SongItemProps) => {
  return (
    <Link href={`/song/${song.id}`} asChild>
      <View
        className={`
        mb-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm shadow-black/10
        ${Platform.select({
          android: "elevation-3",
        })}
      `}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">
              {song.name}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {song.author}
            </Text>
          </View>
          <View className="ml-2">
            <IconSymbol name="chevron.right" size={20} color="#9CA3AF" />
          </View>
        </View>
      </View>
    </Link>
  );
};
