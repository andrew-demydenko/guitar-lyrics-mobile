import { AntDesign } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { Button } from "@/components/ui/Button";
import { CHORDS } from "@/constants/Chords";

type ChordRiffPickerProps = {
  chordsRiff?: string[];
  onSave: (chords: string[]) => void;
};

export const ChordRiffPicker = ({
  chordsRiff = [],
  onSave,
}: ChordRiffPickerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChords, setSelectedChords] = useState<string[]>([]);

  const setChord = (chord: string) => {
    setSelectedChords([...selectedChords, chord]);
  };

  const handleRemoveChord = (index: number) => {
    setSelectedChords(selectedChords.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setSelectedChords(chordsRiff);
  }, [chordsRiff]);

  const handleSave = () => {
    onSave(selectedChords);
    setIsModalOpen(false);
  };

  return (
    <View>
      <Button
        variant="secondary"
        className="px-2 py-1"
        size="sm"
        onPress={() => setIsModalOpen(true)}
      >
        Set guitar riff
      </Button>

      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-4/5 bg-white rounded-lg p-6 shadow-lg">
            <Text className="text-lg font-medium mb-4">Pick your chords</Text>

            <ScrollView className="max-h-[135px] my-4 mb-4">
              <View className="flex-row flex-wrap gap-2">
                {CHORDS.map((chord) => (
                  <Button
                    key={chord}
                    size="sm"
                    variant="secondary"
                    onPress={() => setChord(chord)}
                    className="m-0.5"
                  >
                    {chord}
                  </Button>
                ))}
              </View>
            </ScrollView>

            <View className="mb-4">
              <View className="flex-row justify-between mb-2">
                <Text className="font-medium">Selected Chords:</Text>
                {selectedChords.length > 0 && (
                  <Button
                    onPress={() =>
                      setSelectedChords(selectedChords.slice(0, -1))
                    }
                    variant="danger"
                    size="sm"
                  >
                    <FontAwesome5 name="backspace" size={14} color="white" />
                    <Text className="text-white ml-1">Remove</Text>
                  </Button>
                )}
              </View>

              <View className="flex-row flex-wrap gap-2">
                {selectedChords.length > 0 ? (
                  selectedChords.map((chord, index) => (
                    <View
                      key={`chord-${index}`}
                      className="bg-gray-200 px-2 py-1 rounded flex-row items-center"
                    >
                      <Text>{chord}</Text>
                      <Pressable
                        onPress={() => handleRemoveChord(index)}
                        className="ml-1"
                      >
                        <AntDesign name="close" size={14} color="red" />
                      </Pressable>
                    </View>
                  ))
                ) : (
                  <Text>No chords selected</Text>
                )}
              </View>
            </View>

            <View className="flex-row justify-end gap-2">
              <Button
                variant="secondary"
                onPress={() => setIsModalOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onPress={handleSave}>Save</Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
