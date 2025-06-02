import { Entypo } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { useColorScheme } from "nativewind";
import React from "react";
import { View, Platform } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import { Button } from "@/components/ui/Button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const theme = colorScheme || "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[theme].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
        headerRight: () => {
          return (
            <View className="mr-4">
              <Button
                onPress={() => router.push("/profile")}
                className="p-1 mb-2 rounded-full bg-gray-300 dark:bg-gray-800"
              >
                <Entypo name="user" size={24} />
              </Button>
            </View>
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="songs"
        options={{
          title: "My Songs",
          headerTitle: "My Songs",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="music.note.list" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerTitle: "Search Songs",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerTitle: "Favorite Songs",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="favorite" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
