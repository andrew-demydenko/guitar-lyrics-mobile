import { Stack } from "expo-router";
import { BackButton } from "@/components/ui";
import { useHeaderStyles } from "@/hooks/useHeaderStyles";

export default function ModalLayout() {
  const headerStyles = useHeaderStyles();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        presentation: "modal",
        headerTransparent: false,
        headerShadowVisible: false,
        headerStyle: headerStyles as any,
        contentStyle: {
          padding: 10,
          paddingBottom: 0,
        },
        headerLeft: () => <BackButton />,
      }}
    />
  );
}
