import cn from "classnames";
import React, { useState, useRef, useCallback } from "react";
import {
  Pressable,
  Modal,
  Animated,
  PressableProps,
  Dimensions,
  View as RNView,
} from "react-native";
import { ButtonProps, View } from "@/components/ui";

interface ModalActionsProps {
  backdrop?: string;
  button: React.ReactElement<ButtonProps>;
  children: React.ReactNode;
  buttonColor?: PressableProps;
}

const minModalWidth = 180;

export const ModalActions = ({
  backdrop = "bg-black/30",
  button,
  children,
}: ModalActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const [isMeasured, setIsMeasured] = useState(false);
  const modalContentRef = useRef<RNView>(null);
  const buttonRef = useRef<RNView>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onShowModal = useCallback(() => {
    setIsMeasured(false);
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      const { width: screenWidth, height: screenHeight } =
        Dimensions.get("window");

      modalContentRef.current?.measureInWindow(
        (_, __, modalWidth, modalHeight) => {
          let right = screenWidth - x - width - 10;
          let top = y + height + 8;

          right = Math.max(10, Math.min(right, screenWidth - modalWidth - 10));

          if (top + modalHeight > screenHeight) {
            top = Math.max(10, y - modalHeight - 8);
          }

          setModalPosition({ top, right });
          setIsMeasured(true);
        }
      );
    });

    Animated.spring(scaleAnim, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const closeModal = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    setIsOpen(false);
    setIsMeasured(false);
  };

  const animatedButtonStyle = {
    transform: [{ scale: scaleAnim }],
    zIndex: 100,
  };

  return (
    <View ref={buttonRef} className="relative">
      <Animated.View style={animatedButtonStyle}>
        {React.cloneElement(button, {
          onPress: () => setIsOpen(true),
          buttonColor: isOpen
            ? "primary"
            : button.props.buttonColor || "secondary",
        })}
      </Animated.View>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="none"
        onShow={onShowModal}
        onRequestClose={closeModal}
      >
        <Pressable
          className={`absolute inset-0 ${backdrop}`}
          onPress={closeModal}
        />

        <View
          ref={modalContentRef}
          className={cn(
            "absolute bg-white border border-gray-300 rounded-md shadow-md p-2",
            {
              invisible: !isMeasured,
            }
          )}
          style={{
            minWidth: minModalWidth,
            top: modalPosition.top,
            right: modalPosition.right,
          }}
        >
          {children}
        </View>
      </Modal>
    </View>
  );
};
