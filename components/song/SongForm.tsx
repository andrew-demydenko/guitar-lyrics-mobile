import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import { SubmitHandler, useFormContext, FieldValues } from "react-hook-form";
import { View, ScrollView, Text } from "react-native";
import Toast from "react-native-toast-message";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CHORDS } from "@/constants/Chords";
import { TInputFields } from "@/entities/form";
import { Song, ChordPositions } from "@/entities/song";
import request from "@/lib/axios";
import { useDebounce } from "@/lib/common";
import { useAuthProvider } from "@/providers/AuthProvider";
import { ChordsButtons } from "./ChordsButtons";
import { ImportSong } from "./ImportSong";
import { SongView } from "./SongView";
import { isServiceLine, isDistanceValid } from "./utils";

export interface IFormInputs {
  name: string;
  author: string;
  text: string;
  shared: boolean;
  chords?: string;
}

export const defaultValues: IFormInputs = {
  name: "",
  author: "",
  text: "",
  shared: false,
  chords: "",
};

const INPUTS: TInputFields<IFormInputs> = {
  name: {
    label: "Название",
    name: "name",
    placeholder: "Введите название песни",
    rules: {
      required: "Название обязательно",
    },
  },
  author: {
    label: "Автор",
    name: "author",
    placeholder: "Введите автора",
    rules: {
      required: "Автор обязателен",
    },
  },
  shared: {
    label: "Общий доступ",
    name: "shared",
  },
  text: {
    label: "Текст",
    name: "text",
    placeholder: "Введите текст песни",
    rules: {
      required: "Текст обязателен",
    },
  },
};

export const SongForm = forwardRef(
  ({ editData }: { editData?: Song | null }, ref) => {
    const { control, handleSubmit, watch, setValue, reset } = useFormContext();
    const { user } = useAuthProvider();
    const router = useRouter();
    const [selectedChord, setSelectedChord] = useState<string>(CHORDS[0]);
    const [chordPositions, setChordPositions] = useState<ChordPositions>([]);

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
      mutationFn: async (data: FieldValues) => {
        const requestData = { ...data, userId: user?.id };
        if (editData) {
          const song = await request.patch(
            `/songs/${editData.id}`,
            requestData
          );
          return song.data;
        } else {
          const song = await request.post("/songs", requestData);
          return song.data;
        }
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["songs"],
        });
        queryClient.invalidateQueries({
          queryKey: ["songs", user?.id],
        });
        router.push(`./songs/${data.id}`);
        Toast.show({
          type: "success",
          text1: "Песня успешно сохранена",
        });
      },
      onError: (error: any) => {
        Toast.show({
          type: "error",
          text1: error?.message || "Не удалось сохранить песню",
        });
      },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      mutate({ ...data, chords: JSON.stringify(chordPositions) });
    };

    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        handleSubmit(onSubmit)();
      },
    }));

    const watchedText = watch("text");
    const deferredText = useDebounce(watchedText, 500);

    useEffect(() => {
      if (editData) {
        reset(editData);
        if (editData.chordPositions) {
          setChordPositions(editData.chordPositions);
        }
      }
    }, [editData, reset]);

    const handleAddChord = useCallback(
      (line: string, charIndex: number) => {
        if (!selectedChord) return;

        if (isServiceLine(line)) {
          return;
        }

        if (!isDistanceValid(line, charIndex, chordPositions)) {
          return;
        }

        setChordPositions((prev) => [
          ...prev,
          [charIndex, selectedChord, line],
        ]);
      },
      [chordPositions, selectedChord]
    );

    const handleRemoveChord = useCallback(
      (line: string, charIndex: number) => {
        setChordPositions(
          chordPositions.filter(
            (chord) => !(chord[0] === charIndex && chord[2] === line)
          )
        );
      },
      [chordPositions]
    );

    const handleChordsRiff = useCallback(
      (chords: typeof CHORDS, lineIndex: number) => {
        const lines = deferredText.split("\n");
        if (lineIndex !== null && lineIndex < lines.length) {
          const chordsString = chords.join(" ");
          lines[lineIndex] = `| ${chordsString}`;
          setValue("text", lines.join("\n"));
        }
      },
      [deferredText, setValue]
    );

    return (
      <ScrollView className="flex-1 p-4">
        <View>
          <Input
            name={INPUTS["name"].name}
            label={INPUTS["name"].label}
            control={control}
            rules={INPUTS["name"].rules}
            placeholder={INPUTS["name"].placeholder}
          />

          <Input
            name={INPUTS["author"].name}
            label={INPUTS["author"].label}
            control={control}
            rules={INPUTS["author"].rules}
            placeholder={INPUTS["author"].placeholder}
          />

          <Checkbox
            name={INPUTS["shared"].name}
            label={INPUTS["shared"].label}
            control={control}
          />

          {!editData && (
            <ImportSong
              onImport={(data) => {
                if (data.chords) {
                  setChordPositions(data.chords);
                }
                setValue("text", data.text);
              }}
            />
          )}

          <Textarea
            name={INPUTS["text"].name}
            label={INPUTS["text"].label}
            control={control}
            rules={INPUTS.text}
            placeholder={INPUTS["text"].placeholder}
            className="h-[200px]"
          />

          {deferredText?.length ? (
            <ScrollView
              alwaysBounceVertical={true}
              className="max-h-[150px] my-4 mb-4"
            >
              <ChordsButtons
                selectedChord={selectedChord}
                onSelectChord={setSelectedChord}
              />
            </ScrollView>
          ) : null}

          <Text className="font-medium text-base">
            Нажмите на символ, чтобы добавить выбранный аккорд:
          </Text>
          <SongView
            song={{ text: deferredText || "", chordPositions }}
            handleAddChord={handleAddChord}
            handleRemoveChord={handleRemoveChord}
            handleChordsRiff={handleChordsRiff}
          />
        </View>
      </ScrollView>
    );
  }
);

SongForm.displayName = "SongForm";
