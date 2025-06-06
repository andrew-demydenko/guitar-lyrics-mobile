import { Stack } from "expo-router";
import { BackButton } from "@/components/ui";
import { useHeaderStyles } from "@/hooks/useHeaderStyles";

export default function SongLayout() {
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
        headerStyle: headerStyles,
        headerLeft: () => <BackButton />,
      }}
    >
      <Stack.Screen name="[songId]" options={{ title: "Song" }} />
      <Stack.Screen name="edit/[songId]" options={{ title: "Edit Song" }} />
      <Stack.Screen name="create" options={{ title: "New Song" }} />
    </Stack>
  );
}
