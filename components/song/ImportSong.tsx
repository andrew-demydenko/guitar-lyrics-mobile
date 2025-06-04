import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, TextInput, Switch, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { View, Text, Button } from "@/components/ui";
import { CHORDS } from "@/constants/Chords";
import { ChordPositions } from "@/entities/song";
import { isServiceLine, isChordsLine, addExtraSpaceOnRepeat } from "./utils";

interface ChordTextPart {
  chords?: ChordPositions;
  text: string;
}

const parseChordText = (
  text: string,
  autoFixChords: boolean
): ChordTextPart => {
  const chordPositions: ChordPositions = [];
  let cleanText = "";
  const lines = addExtraSpaceOnRepeat(text.split("\n"));
  let lineIndex = 0;

  const addLine = (line: string, withPrefix: boolean = false) => {
    if (withPrefix && line.trim()) {
      cleanText += "| ";
    }
    cleanText += line + "\n";
  };

  lines.forEach((line, index) => {
    const parts = line.split(/(\s+)/);
    const hasChords = isChordsLine(line);
    let lineCharIndex = 0;
    const nextLine = lines[index + 1];
    const prevLine = lines[index - 1];

    if (hasChords) {
      if (
        !nextLine?.trim() ||
        isChordsLine(nextLine) ||
        isServiceLine(nextLine)
      ) {
        lineIndex += 1;
        addLine(line);
      }
      parts.forEach((part) => {
        const isChord = CHORDS.includes(part);

        if (isChord) {
          const prev = chordPositions[lineIndex - 1];
          if (prev && prev[2] === nextLine && prev[0] - lineCharIndex < 3) {
            lineCharIndex += 2;
          }

          chordPositions.push([lineCharIndex, part, nextLine]);
        } else {
          lineCharIndex +=
            autoFixChords && part.length > 5
              ? Math.round(part.length / 1.6)
              : part.length;
        }
      });
    } else {
      lineIndex += 1;
      addLine(line, !isChordsLine(prevLine));
    }
  });

  return { text: cleanText.trim(), chords: chordPositions };
};

interface ImportSongProps {
  onImport: (data: ChordTextPart) => void;
}

export const ImportSong: React.FC<ImportSongProps> = ({ onImport }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [importText, setImportText] = useState<string>("");
  const [autoFixChords, setAutoFixChords] = useState(false);

  const handleImportSubmit = () => {
    if (!importText) {
      Toast.show({
        type: "error",
        text1: "Пожалуйста, вставьте текст для импорта",
      });
      return;
    }

    const parsedData = parseChordText(importText, autoFixChords);
    onImport(parsedData);
    setIsModalOpen(false);
    setImportText("");
    Toast.show({
      type: "success",
      text1: "Текст успешно импортирован",
    });
  };

  return (
    <View className="my-4">
      <Button className="w-full" onPress={() => setIsModalOpen(true)}>
        <Text>Импортировать песню</Text>
      </Button>

      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[95%] max-w-[700px] bg-white p-6 rounded-lg min-h-[90%]">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-medium">
                Импорт песни с аккордами
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalOpen(false)}
                className="p-2"
              >
                <Ionicons name="close" size={28} color="#000" />
              </TouchableOpacity>
            </View>

            <TextInput
              multiline
              value={importText}
              onChangeText={setImportText}
              placeholder="Вставьте текст песни с аккордами"
              className="flex-1 border border-gray-200 rounded-lg p-4 font-mono mb-6"
              textAlignVertical="top"
            />

            <View className="flex-row items-center mb-6">
              <Switch value={autoFixChords} onValueChange={setAutoFixChords} />
              <Text className="ml-2 text-base">
                Автоматически выравнивать аккорды
              </Text>
            </View>

            <View className="flex-row justify-end">
              <Button
                disabled={!importText}
                onPress={handleImportSubmit}
                className="px-6"
              >
                <Text className="text-base">Импортировать</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
