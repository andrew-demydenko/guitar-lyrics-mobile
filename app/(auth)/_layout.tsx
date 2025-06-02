import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function AuthLayout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "height" : "height"}
      style={{ flex: 1 }}
    >
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
      </Stack>
    </KeyboardAvoidingView>
  );
}
