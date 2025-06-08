import React, { useState, useRef } from "react";
import { ScrollView } from "react-native";
import { View, Button } from "@/components/ui";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Settings } from "./SongSettings";

interface ScrollWrapperProps {
  children: (props: { toneKey: number; fontSize: number }) => React.ReactNode;
}

const SCROLL_DELAY = 16; // ~60 FPS

export const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children }) => {
  const [scrolling, setScrolling] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [fontSize, setFontSize] = useState(14);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const currentScrollRef = useRef(0);
  const scrollIntervalRef = useRef<number | null>(null);
  const [transposition, setTransposition] = useState(0);

  const startScrolling = () => {
    if (scrolling || contentHeight <= containerHeight) return;

    setScrolling(true);
    const maxScroll = contentHeight - containerHeight;

    scrollIntervalRef.current = setInterval(() => {
      currentScrollRef.current = Math.min(
        currentScrollRef.current + 0.5 * speedMultiplier,
        maxScroll
      );

      scrollViewRef.current?.scrollTo({
        y: currentScrollRef.current,
        animated: false,
      });

      if (currentScrollRef.current >= maxScroll) {
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

  const handleContentSizeChange = (_: number, h: number) => {
    setContentHeight(h);
  };

  const handleLayout = (e: any) => {
    setContainerHeight(e.nativeEvent.layout.height);
  };

  const changeTransposition = (val: number) => {
    const newTransposition = transposition + val;
    if (newTransposition >= -9 && newTransposition <= 9) {
      setTransposition(newTransposition);
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-between mb-3 z-auto">
        <View className="flex-row mb-2 gap-4">
          <Button
            icon={() => (
              <IconSymbol
                name={scrolling ? "pause" : "play.fill"}
                color="white"
                size={14}
              />
            )}
            size="sm"
            onPress={scrolling ? stopScrolling : startScrolling}
            className="flex-row items-center"
            labelClass="w-14"
          >
            {scrolling ? "Stop" : "Play"}
          </Button>
          <Button
            size="sm"
            key={speedMultiplier}
            buttonColor="primary"
            onPress={() =>
              setSpeedMultiplier(speedMultiplier < 3 ? speedMultiplier + 1 : 1)
            }
          >
            Speed: {speedMultiplier}x
          </Button>
        </View>

        <Settings
          fontSize={fontSize}
          setFontSize={setFontSize}
          transposition={transposition}
          onTranspositionChange={changeTransposition}
        />
      </View>

      <ScrollView
        ref={scrollViewRef}
        className="flex-1 border border-gray-300 mb-4"
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleLayout}
        scrollEventThrottle={16}
      >
        <View>
          <View className="space-y-2">
            {children({ toneKey: transposition, fontSize })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
