import { cssInterop } from "nativewind";
import React from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { KeyboardTypeOptions } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Text } from "./Text";
import { View } from "./View";

const StyledTextInput = cssInterop(TextInput, {
  className: {
    target: "style",
  },
  contentClass: {
    target: "contentStyle",
  },
  outlineClass: {
    target: "outlineStyle",
  },
});

interface InputProps<T extends FieldValues> extends TextInputProps {
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
  ...rest
}: InputProps<T>) => {
  const { getThemeColor } = useThemeColor();
  const primaryColor = getThemeColor("primary");

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
      <StyledTextInput
        outlineClass="!bg-background"
        mode="outlined"
        label={label}
        outlineColor={primaryColor}
        activeOutlineColor={primaryColor}
        error={!!error}
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
        {...rest}
      />
      {error && (
        <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
      )}
    </View>
  );
};
