import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { ModalActions } from "@/components/ModalActions";
import { View, Text, Button } from "@/components/ui";

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
  return (
    <ModalActions
      button={
        <Button size="sm" className="flex-row items-center z-10">
          <AntDesign name="setting" size={16} />
        </Button>
      }
    >
      <>
        <View className="flex-row justify-end items-center mb-3">
          <Text className="text-base mr-2">Size:</Text>
          <Button
            size="sm"
            disabled={fontSize <= 8}
            onPress={() => setFontSize(Math.max(fontSize - 2, 8))}
          >
            -
          </Button>
          <Button className="mx-2" size="sm" onPress={() => setFontSize(14)}>
            D
          </Button>
          <Button
            size="sm"
            disabled={fontSize >= 28}
            onPress={() => setFontSize(Math.min(fontSize + 2, 28))}
          >
            +
          </Button>
        </View>

        <View className="flex-row justify-end items-center">
          <Text className="text-base mr-2">Tone:</Text>
          <Button
            size="sm"
            disabled={transposition === -9}
            onPress={() => onTranspositionChange(-1)}
          >
            -
          </Button>
          <Text className="w-[36px] mx-2 text-center">{transposition}</Text>
          <Button
            size="sm"
            disabled={transposition === 9}
            onPress={() => onTranspositionChange(1)}
          >
            +
          </Button>
        </View>
      </>
    </ModalActions>
  );
};
