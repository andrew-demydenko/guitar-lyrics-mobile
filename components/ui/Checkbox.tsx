import { cssInterop } from "nativewind";
import React from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { Platform, Pressable } from "react-native";
import { Checkbox as RNCheckbox } from "react-native-paper";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Text } from "./Text";
import { View } from "./View";

type CheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
};

const StyledRNCheckboxItem = cssInterop(RNCheckbox.Item, {
  className: "style",
});

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

  let checkboxComponent = (
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
  );
  if (Platform.OS === "ios") {
    checkboxComponent = (
      <StyledRNCheckboxItem
        label={label}
        mode="ios"
        onPress={() => field.onChange(!field.value)}
        status={field.value ? "checked" : "unchecked"}
        color={primaryColor}
      />
    );
  }

  return (
    <View className="mb-4">
      {checkboxComponent}
      {error && (
        <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
      )}
    </View>
  );
};
