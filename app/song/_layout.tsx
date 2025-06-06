import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Platform, StyleProp } from "react-native";
import { useHeaderStyles } from "@/hooks/useHeaderStyles";

export default function SongLayout() {
  const router = useRouter();
  const headerStyles = useHeaderStyles();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTransparent: false,
        headerShadowVisible: false,
        contentStyle: {
          padding: 10,
          paddingBottom: 0,
        },
        headerStyle: headerStyles as StyleProp<{ backgroundColor?: string }>,
        // headerStyle wait only backgroundColor
        headerLeft: () => (
          <TouchableOpacity
            className={Platform.select({
              ios: "ml-0",
              default: "ml-4",
            })}
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace("/");
              }
            }}
          >
            <Ionicons
              name="chevron-back-outline"
              className="text-black"
              size={24}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="[songId]" options={{ title: "Song" }} />
      <Stack.Screen name="edit/[songId]" options={{ title: "Edit Song" }} />
      <Stack.Screen name="create" options={{ title: "New Song" }} />
    </Stack>
  );
}
