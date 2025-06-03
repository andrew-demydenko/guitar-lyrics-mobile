import { Entypo, MaterialIcons } from "@expo/vector-icons";
import cn from "classnames";
import { Tabs, router } from "expo-router";
import React from "react";
import { View, Platform } from "react-native";
import { FAB, IconButton } from "react-native-paper";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/TabBarBackground";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function TabLayout() {
  const { getColor } = useThemeColor();

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerStyle: {
            borderBottomColor: getColor("secondary"),
            boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.3)",
          },
          tabBarActiveTintColor: getColor("active"),
          tabBarInactiveTintColor: getColor("secondary"),
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
            },
            default: {
              borderTopColor: getColor("secondary"),
              boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.3)",
            },
          }),
          headerRight: () => {
            return (
              <View
                className={Platform.select({
                  ios: "mb-3",
                  default: "mr-2",
                })}
              >
                <IconButton
                  className="bg-gray-300 p-1"
                  mode="contained"
                  icon={() => (
                    <Entypo
                      name="user"
                      className="text-white dark:text-black"
                      size={26}
                    />
                  )}
                  onPress={() => router.push("/profile")}
                  size={20}
                />
              </View>
            );
          },
          headerShown: true,
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
      </Tabs>

      <FAB
        icon={() => (
          <MaterialIcons name="add" size={34} className="text-white" />
        )}
        className={cn(
          "absolute",
          "shadow-lg",
          Platform.select({
            ios: "bottom-24",
            android: "bottom-12",
            default: "bottom-16",
          }),
          "right-4",
          "bg-red-400",
          "rounded-full"
        )}
        onPress={() => router.push("/song/create")}
        size="large"
      />
    </View>
  );
}
