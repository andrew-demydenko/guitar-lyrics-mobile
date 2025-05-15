import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { logout } from "@/api/auth";
import { clearAuthData } from "@/lib/auth";

export default function Logout() {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
      } finally {
        await clearAuthData();
        router.replace("./login");
      }
    };

    handleLogout();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
