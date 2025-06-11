import { Stack } from "expo-router";
import React, { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Platform } from "react-native";
import {
  SongForm,
  defaultValues,
  IFormInputs,
} from "@/components/song/SongForm";
import { View, Button } from "@/components/ui";

export default function ModalScreen() {
  const methods = useForm<IFormInputs>({
    defaultValues,
  });
  const formRef = useRef<{ handleSubmit: () => void }>(null);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Новая песня",
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
      <View className="flex-1">
        <FormProvider {...methods}>
          <SongForm ref={formRef} />
        </FormProvider>
      </View>
    </>
  );
}
