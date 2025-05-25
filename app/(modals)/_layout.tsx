import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Platform } from "react-native";

export default function ModalLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        presentation: "modal",
        headerTransparent: false,
        headerShadowVisible: false,
        contentStyle: {
          padding: 10,
          paddingBottom: 0,
        },
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
    />
  );
}
