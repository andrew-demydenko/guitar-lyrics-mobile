import { Link, usePathname } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TInputFields } from "@/entities/form";
import { useLogin } from "@/hooks/data/useAuth";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

interface LoginFormInputs {
  email: string;
  password: string;
}

const defaultValues: LoginFormInputs = {
  email: "",
  password: "",
};

const INPUTS: TInputFields<LoginFormInputs> = {
  email: {
    label: "Email",
    name: "email",
    placeholder: "Введите email",
    rules: {
      required: "Email обязателен",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Некорректный email",
      },
    },
    type: "email",
  },
  password: {
    label: "Пароль",
    name: "password",
    placeholder: "Введите пароль",
    rules: {
      required: "Пароль обязателен",
      minLength: {
        value: 6,
        message: "Пароль должен быть не менее 6 символов",
      },
    },
    type: "password",
  },
};

export default function Login() {
  const { control, handleSubmit, reset } = useForm<LoginFormInputs>({
    defaultValues,
  });
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      reset(defaultValues);
    };
  }, [pathname, reset]);

  const { loading: googleLoading, googleLogin } = useGoogleAuth();
  const { mutateAsync: handleLogin, isPending } = useLogin();

  const isLoading = isPending || googleLoading;

  const onSubmit = (data: LoginFormInputs) => {
    handleLogin(data);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <View className="w-full max-w-md bg-white">
        <Text className="text-2xl font-bold mb-6 text-center">Вход</Text>

        <Input<LoginFormInputs>
          {...INPUTS.email}
          control={control}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input<LoginFormInputs>
          {...INPUTS.password}
          control={control}
          secureTextEntry
        />

        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="mt-4"
        >
          Войти
        </Button>

        <Button
          className="mt-2"
          onPress={() => googleLogin()}
          disabled={isLoading}
        >
          Войти через Google
        </Button>

        <View className="flex-row justify-between mt-4">
          <Link href="./register">
            <Text className="text-blue-500">Регистрация</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
