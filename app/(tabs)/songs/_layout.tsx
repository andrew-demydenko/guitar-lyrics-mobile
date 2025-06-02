import { Stack } from "expo-router";
import React from "react";

export default function SongsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "My Songs",
        }}
      />
      <Stack.Screen
        name="[songId]"
        options={{
          headerShown: false,
          title: "Song",
        }}
      />
    </Stack>
  );
}
