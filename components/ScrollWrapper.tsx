import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState, useRef } from "react";
import { View, Text, Animated, TextInput, ScrollView } from "react-native";
import { Button } from "@/components/ui/Button";

interface ScrollWrapperProps {
  children: (props: { toneKey: number; fontSize: number }) => React.ReactNode;
}

const speeds = [1, 2, 3];
const SCROLL_DELAY = 16; // ~60 FPS

export const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children }) => {
  const [scrolling, setScrolling] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [fontSize, setFontSize] = useState(14);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollIntervalRef = useRef<number | null>(null);
  const [transposition, setTransposition] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);

  const startScrolling = () => {
    if (scrolling || contentHeight <= containerHeight) return;

    setScrolling(true);
    let currentScroll = 0;
    const maxScroll = contentHeight - containerHeight;

    scrollIntervalRef.current = setInterval(() => {
      currentScroll = Math.min(
        currentScroll + 0.5 * speedMultiplier,
        maxScroll,
      );
      scrollY.setValue(currentScroll);

      if (currentScroll >= maxScroll) {
        stopScrolling();
      }
    }, SCROLL_DELAY);
  };

  const stopScrolling = () => {
    setScrolling(false);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  // Измерение размеров контента
  const handleContentSizeChange = (_: number, h: number) => {
    setContentHeight(h);
  };

  const handleLayout = (e: any) => {
    setContainerHeight(e.nativeEvent.layout.height);
  };

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-between mb-3">
        <View className="flex-row space-x-2 mb-2">
          <Button
            size="sm"
            onPress={startScrolling}
            disabled={scrolling}
            className="flex-row items-center"
          >
            <AntDesign name="caretright" size={14} className="mr-1" />
            <Text>Play</Text>
          </Button>
          <Button
            size="sm"
            onPress={stopScrolling}
            disabled={!scrolling}
            className="flex-row items-center"
          >
            <AntDesign name="pause" size={14} className="mr-1" />
            <Text>Stop</Text>
          </Button>
        </View>

        <View className="flex-row items-center space-x-2 mb-2">
          <Text className="text-base">Speed:</Text>
          {speeds.map((speed) => (
            <Button
              key={speed}
              size="sm"
              variant={speed === speedMultiplier ? "primary" : "secondary"}
              onPress={() => setSpeedMultiplier(speed)}
            >
              <Text>{speed}x</Text>
            </Button>
          ))}
        </View>

        <View className="flex-row items-center space-x-2 mb-2">
          <Text className="text-base">Size:</Text>
          <Button
            size="sm"
            onPress={() => setFontSize((p) => Math.min(p + 2, 24))}
          >
            <Text>+</Text>
          </Button>
          <Button size="sm" onPress={() => setFontSize(14)}>
            <Text>D</Text>
          </Button>
          <Button
            size="sm"
            onPress={() => setFontSize((p) => Math.max(p - 2, 10))}
          >
            <Text>-</Text>
          </Button>
        </View>

        <View className="flex-row items-center mb-2">
          <Text className="text-base mr-2">Key:</Text>
          <TextInput
            className="border border-gray-300 rounded px-2 py-1 w-12 text-center"
            keyboardType="numeric"
            value={transposition.toString()}
            onChangeText={(t) => {
              const val = parseInt(t) || 0;
              if (val >= -9 && val <= 9) setTransposition(val);
            }}
          />
        </View>
      </View>

      <Animated.ScrollView
        ref={scrollViewRef}
        className="flex-1 border border-gray-300 mb-4"
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        <View className="p-2">
          <View className="space-y-2">
            {children({ toneKey: transposition, fontSize })}
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};
