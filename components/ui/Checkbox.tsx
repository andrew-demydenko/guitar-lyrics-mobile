import React from "react";
import { useController, Control, FieldValues, Path } from "react-hook-form";
import { Pressable } from "react-native";
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
  const { field } = useController({
    control,
    name,
  });

  return (
    <Pressable
      onPress={() => field.onChange(!field.value)}
      className="flex-row items-center mb-4"
    >
      <View
        className={`w-5 h-5 rounded-md border mr-2 flex items-center justify-center ${field.value ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}
      >
        {field.value && <Text className="text-white">✓</Text>}
      </View>
      <Text className="text-sm font-medium text-gray-700">{label}</Text>
    </Pressable>
  );
};
