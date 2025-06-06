import { useColorScheme } from "nativewind";
import { ScrollView } from "react-native";
import { Switch } from "react-native-paper";
import { Button, View, Text } from "@/components/ui";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuthProvider } from "@/providers/AuthProvider";

export default function ProfileDrawer() {
  const { user, signOut } = useAuthProvider();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { getThemeColor } = useThemeColor();

  return (
    <View className="flex-1 p-6">
      <View className="items-center mb-8">
        <Text className="text-xl font-bold text-gray-900 dark:text-white">
          {user?.name}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400">{user?.email}</Text>
      </View>

      <View className="d-flex justify-between flex-1 mb-4">
        <ScrollView>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg text-gray-900 dark:text-white">
              Dark theme
            </Text>
            <Switch
              value={colorScheme === "dark"}
              onValueChange={toggleColorScheme}
              color={getThemeColor("primary")}
            />
          </View>
        </ScrollView>

        {user && (
          <Button
            className="btn-full-width"
            onPress={signOut}
            buttonColor="danger"
          >
            <Text className="text-white font-medium">Logout</Text>
          </Button>
        )}
      </View>
    </View>
  );
}
