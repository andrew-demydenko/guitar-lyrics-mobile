import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Button } from "@/components/ui/Button";

interface SettingsProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  transposition: number;
  onTranspositionChange: (val: number) => void;
}

export const Settings = ({
  fontSize,
  setFontSize,
  transposition,
  onTranspositionChange,
}: SettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <Pressable
          className="fixed inset-0 z-10"
          onPress={() => setIsOpen(false)}
          pointerEvents="auto"
        />
      ) : null}
      <View className="relative z-10">
        <Button
          size="sm"
          variant={isOpen ? "primary" : "secondary"}
          onPress={() => setIsOpen(!isOpen)}
          className="flex-row items-center"
        >
          <AntDesign name="setting" size={16} />
        </Button>
        {isOpen && (
          <View className="absolute right-0 top-0 bg-white border border-gray-300 rounded-md shadow-md p-2 z-auto">
            <View className="flex-row items-center space-x-2 mb-3">
              <Text className="text-base w-12">Size:</Text>
              <Button
                size="sm"
                disabled={fontSize <= 8}
                onPress={() => setFontSize(Math.max(fontSize - 2, 8))}
              >
                <Text>-</Text>
              </Button>
              <Button size="sm" onPress={() => setFontSize(14)}>
                D
              </Button>
              <Button
                size="sm"
                disabled={fontSize >= 28}
                onPress={() => setFontSize(Math.min(fontSize + 2, 28))}
              >
                <Text>+</Text>
              </Button>
            </View>

            <View className="flex-row items-center space-x-2">
              <Text className="text-base w-12">Tone:</Text>
              <Button
                size="sm"
                disabled={transposition === -9}
                onPress={() => onTranspositionChange(-1)}
              >
                <Text>-</Text>
              </Button>
              <Text className="w-[34px] text-center">{transposition}</Text>
              <Button
                size="sm"
                disabled={transposition === 9}
                onPress={() => onTranspositionChange(1)}
              >
                <Text>+</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </>
  );
};
