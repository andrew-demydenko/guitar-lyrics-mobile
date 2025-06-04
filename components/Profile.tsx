import { useColorScheme } from "nativewind";
import { Switch, ScrollView } from "react-native";
import { Button, View, Text } from "@/components/ui";
import { useAuthProvider } from "@/providers/AuthProvider";

export default function ProfileDrawer() {
  const { user, signOut } = useAuthProvider();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 p-6 bg-white dark:bg-gray-900">
      <View className="items-center mb-8">
        <View className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
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
            />
          </View>
        </ScrollView>

        {user && (
          <Button onPress={signOut} variant="danger">
            <Text className="text-white font-medium">Logout</Text>
          </Button>
        )}
      </View>
    </View>
  );
}
