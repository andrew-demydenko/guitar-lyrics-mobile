import React from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { TextInput } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Text } from "./Text";
import { View } from "./View";

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
  ...rest
}: TextareaProps<T>) => {
  const { getColor } = useThemeColor();
  const primaryColor = getColor("primary");

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
      <TextInput
        label={label}
        mode="outlined"
        error={!!error}
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
        outlineColor={primaryColor}
        activeOutlineColor={primaryColor}
        multiline={true}
        {...rest}
      />
      {error && (
        <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
      )}
    </View>
  );
};
