import { Stack, useLocalSearchParams } from "expo-router";
import React, { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { View, Platform, ActivityIndicator } from "react-native";
import {
  SongForm,
  IFormInputs,
  defaultValues,
} from "@/components/song/SongForm";
import { Button } from "@/components/ui/Button";
import { useSongById } from "@/hooks/data";

export default function ModalScreen() {
  const { songId } = useLocalSearchParams();
  const { data: song, isLoading } = useSongById(songId as string);
  const formRef = useRef<{ handleSubmit: () => void }>(null);
  const methods = useForm<IFormInputs>({
    defaultValues,
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Song",
          headerRight: () => (
            <Button
              className={Platform.select({
                ios: "mr-0",
                default: "mr-4",
              })}
              size="sm"
              onPress={() => {
                if (formRef.current) {
                  formRef.current.handleSubmit();
                }
              }}
              buttonColor="primary"
              disabled={
                methods.formState.isSubmitted && !methods.formState.isValid
              }
            >
              Save
            </Button>
          ),
        }}
      />
      <View className="flex-1 bg-white dark:bg-black p-4 shadow-md">
        <FormProvider {...methods}>
          <SongForm editData={song} ref={formRef} />
        </FormProvider>
      </View>
    </>
  );
}
