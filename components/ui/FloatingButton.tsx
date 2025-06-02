import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { View, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FloatingButton = () => {
  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <View className="absolute p-3 bottom-14 overflow-hidden right-4">
      <Link href="/song/create" asChild>
        <AnimatedPressable
          className="w-24 h-24 rounded-full shadow-lg"
          style={rStyle}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={["rgb(239, 68, 68)", "rgb(220, 38, 38)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-full h-full rounded-full items-center justify-center"
          >
            <AntDesign name="plus" size={32} color="white" />
          </LinearGradient>
        </AnimatedPressable>
      </Link>
    </View>
  );
};
