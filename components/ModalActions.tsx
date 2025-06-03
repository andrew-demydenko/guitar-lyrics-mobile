import cn from "classnames";
import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Pressable,
  Modal,
  Animated,
  PressableProps,
  Dimensions,
} from "react-native";
import { ButtonProps } from "@/components/ui/Button";

interface ModalActionsProps {
  backdrop?: string;
  button: React.ReactElement<ButtonProps>;
  children: React.ReactNode;
  buttonProps?: PressableProps;
}

const minModalWidth = 180;

export const ModalActions = ({
  backdrop = "bg-black/50",
  button,
  children,
}: ModalActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const [isMeasured, setIsMeasured] = useState(false);
  const modalContentRef = useRef<View>(null);
  const buttonRef = useRef<View>(null);
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

          console.log(modalWidth);
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

  console.log(modalPosition, isMeasured, isOpen);
  return (
    <View ref={buttonRef} className="relative">
      <Animated.View style={animatedButtonStyle}>
        {React.cloneElement(button, {
          onPress: () => setIsOpen(true),
          variant: isOpen ? "primary" : button.props.variant || "secondary",
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
