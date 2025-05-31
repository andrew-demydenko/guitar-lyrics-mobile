import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useEffect, useState } from "react";
import { View, Text, Modal, ScrollView, TouchableOpacity } from "react-native";
import { Button } from "@/components/ui/Button";
import { ChordButton } from "./ChordButton";
import { ChordsButtons } from "./ChordsButtons";

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
          <View className="w-[95%] max-w-[700px] bg-white rounded-lg p-6 shadow-lg">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-medium">Pick your chords</Text>
              <TouchableOpacity
                onPress={() => setIsModalOpen(false)}
                className="p-2"
              >
                <Ionicons name="close" size={28} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView className="max-h-[135px] mb-4">
              <ChordsButtons onSelectChord={setChord} />
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

              <View className="flex-row flex-wrap gap-1">
                {selectedChords.length > 0 ? (
                  selectedChords.map((chord, index) => (
                    <ChordButton
                      key={`chord-${index}`}
                      onLongPress={() => handleRemoveChord(index)}
                      chord={chord}
                    />
                  ))
                ) : (
                  <Text>No chords selected</Text>
                )}
              </View>
            </View>

            <View className="flex-row justify-end gap-2">
              <Button onPress={handleSave}>Save</Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
