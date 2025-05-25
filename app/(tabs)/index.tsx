import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      // headerBackgroundColor={{ light: "#A1CEDE", dark: "#2D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcomeeee!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* <Link href="./(modals)/create-song" asChild>
        
      </Link> */}

      <Button href="./(modals)/create-song" className="my-4">
        Создать песню
      </Button>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{" "}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
          to see changes. Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">
            npm run reset-project
          </ThemedText>{" "}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
          directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView className="d-flex gap-2">
        <Button size="sm" variant="danger" isActive={true} onPress={() => {}}>
          test
        </Button>

        <Button size="sm" variant="danger" isActive={false} onPress={() => {}}>
          test
        </Button>
        <Button size="md" variant="secondary" onPress={() => {}}>
          test 1
        </Button>
        <Button size="lg" variant="success" isActive={false} onPress={() => {}}>
          test 2
        </Button>
        <Button size="sm" variant="outline" isActive={true} onPress={() => {}}>
          <AntDesign
            className="mr-2"
            name="caretright"
            size={5}
            color="black"
          />
          Play
        </Button>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
