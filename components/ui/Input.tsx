import React from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { TextInput, KeyboardTypeOptions } from "react-native";
import { Text } from "./Text";
import { View } from "./View";

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  required?: boolean;
  rules?: any;
  placeholder?: string;
  control: Control<T>;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;
}

export const Input = <T extends FieldValues>({
  name,
  label,
  required,
  rules,
  placeholder,
  control,
}: InputProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules: {
      required: required ? "Обязательное поле" : false,
      ...rules,
    },
  });

  return (
    <View className="mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-1">
        {label} {required && <Text className="text-red-500">*</Text>}
      </Text>
      <TextInput
        className={`border rounded-md p-2 placeholder:text-gray-500 ${error ? "border-red-500" : "border-gray-300"}`}
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
      />
      {error && (
        <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
      )}
    </View>
  );
};
