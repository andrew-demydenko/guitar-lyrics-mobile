import { Link } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { BASE_URL } from "@/constants/Config";
import { useLogin } from "@/hooks/data/useAuth";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading: googleLoading, googleLogin } = useGoogleAuth();
  const { mutateAsync: handleLogin, isPending } = useLogin();

  const isLoading = isPending || googleLoading;

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <View className="w-full max-w-md bg-white">
        <Text className="text-2xl font-bold mb-6 text-center">Вход</Text>

        <TextInput
          className="border border-gray-300 p-3 mb-4 rounded"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="border border-gray-300 p-3 mb-6 rounded"
          placeholder="Пароль"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button
          title="Войти"
          onPress={() => handleLogin({ email, password })}
          disabled={isLoading}
        />

        <Button
          title="Войти через Google"
          onPress={() => googleLogin(`${BASE_URL}/login`)}
          disabled={isLoading}
        />
        <View className="flex-row justify-between mt-4">
          <Link href="./register">
            <Text className="text-blue-500">Регистрация</Text>
          </Link>
          <Link href="./forgot-password">
            <Text className="text-blue-500">Забыли пароль?</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
