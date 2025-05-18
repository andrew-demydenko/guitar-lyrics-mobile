import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  SubmitHandler,
  useFormContext,
  Form,
  FieldValues,
} from "react-hook-form";
import { View, ScrollView, Text } from "react-native";
import Toast from "react-native-toast-message";
import { SongView } from "@/components/SongView";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CHORDS } from "@/constants/Chords";
import { TInputFields } from "@/entities/form";
import { Song, ChordPositions } from "@/entities/song";
import request from "@/lib/axios";
import { useAuth } from "@/providers/AuthProvider";
// import { ImportSong } from "./ImportSong";

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
    const { user } = useAuth();
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
      console.log("mutate", data);
      mutate({ ...data, chords: JSON.stringify(chordPositions) });
    };

    useImperativeHandle(ref, () => ({
      handleSubmit: () => {
        handleSubmit(onSubmit)();
      },
    }));

    const watchedText = watch("text");

    useEffect(() => {
      Toast.show({
        type: "info",
        text1:
          "Выберите аккорд и нажмите на строку текста, чтобы добавить аккорд",
      });
      if (editData) {
        reset(editData);
        if (editData.chordPositions) {
          setChordPositions(editData.chordPositions);
        }
      }
    }, [editData, reset]);

    const isDistanceValid = (line: string, charIndex: number) => {
      return !chordPositions.some((chord) => {
        const [existingCharIndex, , existingLine] = chord;
        return (
          existingLine === line && Math.abs(existingCharIndex - charIndex) < 9
        );
      });
    };

    const handleAddChord = (line: string, charIndex: number) => {
      if (!selectedChord) {
        return;
      }
      if (!isDistanceValid(line, charIndex)) {
        return;
      }
      setChordPositions((prev) => [...prev, [charIndex, selectedChord, line]]);
    };

    const handleRemoveChord = (line: string, charIndex: number) => {
      setChordPositions(
        chordPositions.filter(
          (chord) => !(chord[0] === charIndex && chord[2] === line)
        )
      );
    };

    const handleChordsRiff = (chords: typeof CHORDS, lineIndex: number) => {
      const lines = watchedText.split("\n");
      if (lineIndex !== null && lineIndex < lines.length) {
        const chordsString = chords.join(" ");
        lines[lineIndex] = `| ${chordsString}`;
        setValue("text", lines.join("\n"));
      }
    };

    return (
      <ScrollView className="flex-1 p-4">
        <View className="">
          <Form
            onSubmit={(data) => {
              console.log("onSubmit", data);
              // mutate({ ...data, chords: JSON.stringify(chordPositions) });
            }}
          >
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

            {/* {!editData && (
          <ImportSong
            onImport={(data) => {
              if (data.chords) setChordPositions(data.chords);
              setValue("text", data.text);
            }}
          />
        )} */}

            <Textarea
              name={INPUTS["text"].name}
              label={INPUTS["text"].label}
              control={control}
              rules={INPUTS.text}
              placeholder={INPUTS["text"].placeholder}
              className="h-[200px]"
            />

            {watchedText?.length ? (
              <ScrollView
                alwaysBounceVertical={true}
                className="max-h-[150px] my-4 mb-4"
              >
                <View className="flex flex-row flex-wrap gap-2 p-1 pr-3">
                  {CHORDS.map((chord) => (
                    <Button
                      key={chord}
                      className={`px-2 py-1 rounded-md ${selectedChord === chord ? "bg-blue-500" : "bg-gray-200"}`}
                      onPress={() => setSelectedChord(chord)}
                    >
                      <Text
                        className={
                          selectedChord === chord ? "text-white" : "text-black"
                        }
                      >
                        {chord}
                      </Text>
                    </Button>
                  ))}
                </View>
              </ScrollView>
            ) : null}

            <SongView
              song={{ text: watchedText, chordPositions }}
              editable={{ handleRemoveChord, handleAddChord, handleChordsRiff }}
            />

            {/* <Button
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitted && !isValid}
          className="mt-4"
        >
          {editData ? "Обновить песню" : "Сохранить песню"}
        </Button> */}
          </Form>
        </View>
      </ScrollView>
    );
  }
);

SongForm.displayName = "SongForm";
