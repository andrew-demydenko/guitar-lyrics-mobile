import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from "react-native";
import { View, Button } from "@/components/ui";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { throttle } from "@/lib/common";
import { Settings } from "./SongSettings";

interface ScrollWrapperProps {
  children: (props: { toneKey: number; fontSize: number }) => React.ReactNode;
}

const SCROLL_STEP_BASE = 0.5;

export const ScrollWrapper: React.FC<ScrollWrapperProps> = ({ children }) => {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [fontSize, setFontSize] = useState(14);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [transposition, setTransposition] = useState(0);
  const [scrolling, setScrolling] = useState(false); // UI state

  const scrollingRef = useRef(false); // logic state
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const isUserScrollingRef = useRef(false);
  const resumeScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const maxScroll = contentHeight - containerHeight;

  const animateScroll = useCallback(() => {
    if (!scrollingRef.current) return;

    scrollYRef.current = Math.min(
      scrollYRef.current + SCROLL_STEP_BASE * speedMultiplier,
      maxScroll
    );

    scrollViewRef.current?.scrollTo({
      y: scrollYRef.current,
      animated: false,
    });

    if (scrollYRef.current >= maxScroll) {
      stopAutoScroll();
      return;
    }

    animationFrameRef.current = requestAnimationFrame(animateScroll);
  }, [maxScroll, speedMultiplier]);

  useEffect(() => {
    if (scrollingRef.current) {
      cancelAnimationFrame(animationFrameRef.current!);
      animationFrameRef.current = requestAnimationFrame(animateScroll);
    }
  }, [speedMultiplier, scrollingRef, animateScroll]);

  const startAutoScroll = () => {
    if (scrolling || contentHeight <= containerHeight) return;

    setScrolling(true);
    scrollingRef.current = true;
    animationFrameRef.current = requestAnimationFrame(animateScroll);
  };

  const stopAutoScroll = () => {
    setScrolling(false);
    scrollingRef.current = false;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;

    scrollYRef.current = y;
  };

  const handleContentSizeChange = (_: number, height: number) => {
    setContentHeight(height);
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

  const stopAutoScrollTemporarily = () => {
    if (!Math.floor(scrollYRef.current)) return;
    isUserScrollingRef.current = true;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (Platform.OS === "web" && scrollingRef.current) {
      if (resumeScrollTimeoutRef.current) {
        clearTimeout(resumeScrollTimeoutRef.current);
      }
      resumeScrollTimeoutRef.current = setTimeout(() => {
        setTimeout(() => {
          resumeScroll();
          resumeScrollTimeoutRef.current = null;
        });
      }, 500);
    }
  };

  const resumeScroll = () => {
    if (isUserScrollingRef.current) {
      isUserScrollingRef.current = false;

      if (scrollingRef.current) {
        animationFrameRef.current = requestAnimationFrame(animateScroll);
      }
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap justify-between mt-1 mb-3 z-auto">
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
            onPress={scrolling ? stopAutoScroll : startAutoScroll}
            className="flex-row items-center"
            labelClass="w-14"
          >
            {scrolling ? "Stop" : "Play"}
          </Button>
          <Button
            size="sm"
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
        onScroll={handleScroll}
        {...(Platform.OS === "web"
          ? { onWheel: throttle(stopAutoScrollTemporarily, 500) }
          : {
              onTouchStart: stopAutoScrollTemporarily,
              onTouchEnd: resumeScroll,
            })}
        scrollEventThrottle={16}
      >
        <View className="space-y-2">
          {children({ toneKey: transposition, fontSize })}
        </View>
      </ScrollView>
    </View>
  );
};
