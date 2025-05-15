import { AxiosError } from "axios";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";
import { registerUser } from "@/api/auth";
import { setAccessToken } from "@/lib/auth";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      const { data } = await registerUser({ name, email, password });

      await setAccessToken(data.accessToken);

      router.replace("./(tabs)/home");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      Alert.alert(
        "Ошибка",
        axiosError.response?.statusText || "Ошибка регистрации"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <View className="w-full max-w-md bg-white">
        <Text className="text-2xl font-bold mb-6">Регистрация</Text>

        <TextInput
          className="border p-3 mb-4 rounded"
          placeholder="Имя"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          className="border p-3 mb-4 rounded"
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          className="border p-3 mb-6 rounded"
          placeholder="Пароль"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button
          title="Зарегистрироваться"
          onPress={handleRegister}
          disabled={loading}
        />

        <Link href="./login" className="mt-4 text-blue-500 text-center">
          Уже есть аккаунт? Войти
        </Link>
      </View>
    </View>
  );
}
