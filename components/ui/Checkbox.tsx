import React from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { Pressable } from "react-native";
import { Checkbox as RNCheckbox } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Text } from "./Text";
import { View } from "./View";

type CheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
};

export const Checkbox = <T extends FieldValues>({
  name,
  label,
  control,
}: CheckboxProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const { getThemeColor } = useThemeColor();
  const primaryColor = getThemeColor("primary");

  return (
    <View className="mb-4">
      <Pressable
        onPress={() => field.onChange(!field.value)}
        className="flex-row align-center"
      >
        <RNCheckbox
          color={primaryColor}
          uncheckedColor={primaryColor}
          onPress={() => field.onChange(!field.value)}
          status={field.value ? "checked" : "unchecked"}
        />
        <Text className="self-center">{label}</Text>
      </Pressable>
      {error && (
        <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
      )}
    </View>
  );
};
