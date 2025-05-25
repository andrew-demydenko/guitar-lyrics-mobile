import { Stack } from "expo-router";
import { View } from "react-native";
import Profile from "@/components/Profile";

export default function ProfileModal() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Profile",
          presentation: "transparentModal",
          gestureEnabled: true,
          gestureDirection: "horizontal",
          headerStyle: {
            backgroundColor: "white",
          },
          contentStyle: {
            backgroundColor: "white",
          },
          animation: "slide_from_bottom",
        }}
      />
      <Profile />
    </View>
  );
}
