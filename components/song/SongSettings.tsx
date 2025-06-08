import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { IconButton } from "react-native-paper";
import { ModalActions } from "@/components/ModalActions";
import { View, Text, Button } from "@/components/ui";
import { useThemeColor } from "@/hooks/useThemeColor";

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
  const { getThemeColor } = useThemeColor();
  const primaryColor = getThemeColor("primary");

  return (
    <ModalActions
      button={
        <Button
          size="sm"
          className="flex-row items-center z-10"
          labelClass="flex items-center justify-center w-10"
        >
          <AntDesign name="setting" size={20} />
        </Button>
      }
    >
      <>
        <View className="flex-row justify-end items-center mb-3">
          <Text className="text-base text-text mr-2">Size:</Text>
          <IconButton
            disabled={fontSize <= 8}
            containerColor={primaryColor}
            mode="contained"
            onPress={() => setFontSize(Math.max(fontSize - 2, 8))}
            icon={() => (
              <AntDesign name="minus" size={24} className="!text-white" />
            )}
          />

          <IconButton
            className="mx-2"
            containerColor={primaryColor}
            mode="contained"
            onPress={() => setFontSize(14)}
            icon={() => <Text className="my-2 text-center !text-white">D</Text>}
          />
          <IconButton
            mode="contained"
            containerColor={primaryColor}
            disabled={fontSize >= 28}
            onPress={() => setFontSize(Math.min(fontSize + 2, 28))}
            icon={() => (
              <AntDesign name="plus" size={24} className="!text-white" />
            )}
          />
        </View>

        <View className="flex-row justify-end items-center">
          <Text className="text-base text-text mr-2">Tone:</Text>

          <IconButton
            disabled={transposition === -9}
            containerColor={primaryColor}
            mode="contained"
            onPress={() => onTranspositionChange(-1)}
            icon={() => (
              <AntDesign name="minus" size={24} className="!text-white" />
            )}
          />
          <IconButton
            mode="contained"
            containerColor={primaryColor}
            disabled={true}
            icon={() => (
              <Text className="my-2 text-center !text-white">
                {transposition}
              </Text>
            )}
          />

          <IconButton
            mode="contained"
            containerColor={primaryColor}
            disabled={transposition === 9}
            onPress={() => onTranspositionChange(1)}
            icon={() => (
              <AntDesign name="plus" size={24} className="!text-white" />
            )}
          />
        </View>
      </>
    </ModalActions>
  );
};
