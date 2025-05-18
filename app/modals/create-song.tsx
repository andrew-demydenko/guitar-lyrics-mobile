import { Stack } from "expo-router";
import { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SongForm, defaultValues, IFormInputs } from "@/components/SongForm";
import { Button } from "@/components/ui/Button";

export default function ModalScreen() {
  const insets = useSafeAreaInsets();
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
              className="m-4"
              onPress={() => {
                if (formRef.current) {
                  formRef.current.handleSubmit();
                }
              }}
              variant="primary"
              disabled={
                methods.formState.isSubmitted && !methods.formState.isValid
              }
            >
              Save song
            </Button>
          ),
        }}
      />
      <View
        style={{ marginTop: insets.top }}
        className="flex-1 bg-white dark:bg-black p-4 shadow-md"
      >
        <FormProvider {...methods}>
          <SongForm ref={formRef} />
        </FormProvider>
      </View>
    </>
  );
}
