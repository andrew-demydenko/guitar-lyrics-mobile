import React from "react";
import { IconButton } from "react-native-paper";
import { ModalActions } from "@/components/ModalActions";
import { View, Text, Button } from "@/components/ui";
import { IconSymbol } from "@/components/ui/IconSymbol";

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
        <Button size="sm" labelClass="px-2 flex justify-center w-10">
          <IconSymbol name="gearshape.fill" size={20} color="white" />
        </Button>
      }
    >
      <>
        <View className="flex-row justify-end items-center mb-3">
          <Text className="text-base text-text mr-2">Size:</Text>
          <IconButton
            disabled={fontSize <= 8}
            onPress={() => setFontSize(Math.max(fontSize - 2, 8))}
            icon={() => <IconSymbol name="minus" size={24} color="black" />}
          />

          <IconButton
            className="mx-2"
            mode="outlined"
            onPress={() => setFontSize(14)}
            icon={() => <Text className="my-2 text-center">D</Text>}
          />
          <IconButton
            disabled={fontSize >= 28}
            onPress={() => setFontSize(Math.min(fontSize + 2, 28))}
            icon={() => <IconSymbol name="plus" size={24} color="black" />}
          />
        </View>

        <View className="flex-row justify-end items-center">
          <Text className="text-base text-text mr-2">Tone:</Text>

          <IconButton
            disabled={transposition === -9}
            onPress={() => onTranspositionChange(-1)}
            icon={() => <IconSymbol name="minus" size={24} color="black" />}
          />
          <IconButton
            disabled={true}
            mode="outlined"
            icon={() => (
              <Text color="black" className="my-2 text-center">
                {transposition}
              </Text>
            )}
          />

          <IconButton
            disabled={transposition === 9}
            onPress={() => onTranspositionChange(1)}
            icon={() => <IconSymbol name="plus" size={24} color="black" />}
          />
        </View>
      </>
    </ModalActions>
  );
};
