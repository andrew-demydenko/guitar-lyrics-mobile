import React from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { TextInput, View, Text } from "react-native";

type TextareaProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  required?: boolean;
  rules?: any;
  placeholder?: string;
  className?: string;
};

export const Textarea = <T extends FieldValues>({
  name,
  label,
  required,
  rules,
  placeholder,
  control,
  className,
}: TextareaProps<T>) => {
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
        className={`border rounded-md p-2 placeholder:text-gray-500 ${error ? "border-red-500" : "border-gray-300"} ${className}`}
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
        multiline
        textAlignVertical="top"
      />
      {error && (
        <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
      )}
    </View>
  );
};
