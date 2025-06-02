import { AxiosError } from "axios";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { Alert, Text, View } from "react-native";
import { registerUser } from "@/api/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TInputFields } from "@/entities/form";
import { setAccessToken } from "@/lib/auth";

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

const defaultValues: RegisterFormInputs = {
  name: "",
  email: "",
  password: "",
};

const INPUTS: TInputFields<RegisterFormInputs> = {
  name: {
    label: "Имя",
    name: "name",
    placeholder: "Введите имя",
    rules: {
      required: "Имя обязательно",
      minLength: {
        value: 2,
        message: "Имя должно быть не менее 2 символов",
      },
    },
    type: "text",
  },
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

export default function Register() {
  const { control, handleSubmit } = useForm<RegisterFormInputs>({
    defaultValues,
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const response = await registerUser(data);
      await setAccessToken(response.accessToken);
      router.replace("/(tabs)");
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      Alert.alert(
        "Ошибка",
        axiosError.response?.statusText || "Ошибка регистрации"
      );
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <View className="w-full max-w-md bg-white">
        <Text className="text-2xl font-bold mb-6">Регистрация</Text>

        <Input<RegisterFormInputs> {...INPUTS.name} control={control} />

        <Input<RegisterFormInputs>
          {...INPUTS.email}
          control={control}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input<RegisterFormInputs>
          {...INPUTS.password}
          control={control}
          secureTextEntry
        />

        <Button onPress={handleSubmit(onSubmit)} className="mt-4">
          Зарегистрироваться
        </Button>

        <Link href="./login" className="mt-4">
          <Text className="text-blue-500 text-center">
            Уже есть аккаунт? Войти
          </Text>
        </Link>
      </View>
    </View>
  );
}
