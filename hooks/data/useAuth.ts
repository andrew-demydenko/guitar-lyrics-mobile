import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { Alert } from "react-native";
import { login } from "@/api/auth";
import { setAccessToken } from "@/lib/auth";

interface LoginParams {
  email: string;
  password: string;
}

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      const { data } = await login({ email, password });
      await setAccessToken(data.accessToken);
    },
    onSuccess: () => {
      router.replace("/");
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        Alert.alert("Ошибка", error.response?.data.message || "Ошибка входа");
      }
    },
  });

  return mutation;
};
