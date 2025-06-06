import { Stack } from "expo-router";
import Profile from "@/components/Profile";
import { View } from "@/components/ui";

export default function ProfileModal() {
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: "Profile",
          presentation: "transparentModal",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          animation: "slide_from_bottom",
        }}
      />
      <Profile />
    </View>
  );
}
