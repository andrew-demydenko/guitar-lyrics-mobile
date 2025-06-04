import { Href, router } from "expo-router";
import React, { forwardRef, useState, useCallback } from "react";
import {
  Pressable,
  PressableProps,
  GestureResponderEvent,
  View,
} from "react-native";
import { style } from "twrnc";
import { Text } from "./Text";

export interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  type?: "button" | "submit" | "reset";
  form?: string;
  href?: Href;
}

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      children,
      className = "",
      isActive = false,
      disabled = false,
      size = "md",
      variant = "primary",
      onPressIn: externalPressIn,
      onPressOut: externalPressOut,
      onPress: externalOnPress,
      href,
      ...rest
    },
    ref
  ) => {
    const [pressed, setPressed] = useState(false);

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        setPressed(false);
        externalPressOut?.(event);
      },
      [externalPressOut]
    );

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        if (isActive) return;
        setPressed(true);
        externalPressIn?.(event);
      },
      [isActive, externalPressIn]
    );

    const handlePress = useCallback(
      (event: GestureResponderEvent) => {
        if (href) {
          router.push(href);
        }
        externalOnPress?.(event);
      },
      [href, externalOnPress]
    );

    const sizeClasses = {
      sm: "py-2 px-3 rounded-md",
      md: "py-3 px-4 rounded-lg",
      lg: "py-4 px-6 rounded-xl",
    };

    const variantClasses = {
      primary: "bg-blue-600 active:bg-blue-700",
      secondary: "bg-gray-600 active:bg-gray-700",
      outline: "border-2 border-blue-500 bg-white active:bg-blue-50",
      danger: "bg-red-500 active:bg-red-600",
      success: "bg-green-500 active:bg-green-600",
    };

    const activeClasses = {
      primary: "bg-blue-700 border-2 border-blue-300",
      secondary: "bg-gray-700 border-2 border-gray-300",
      outline: "bg-blue-100 border-2 border-blue-600",
      danger: "bg-red-600 border-2 border-red-300",
      success: "bg-green-600 border-2 border-green-300",
    };

    const textColor = {
      primary: "text-white",
      secondary: "text-white",
      outline: isActive ? "text-blue-700" : "text-blue-600",
      danger: "text-white",
      success: "text-white",
    }[variant];

    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={style(
          "flex-row items-center justify-center",
          isActive ? activeClasses[variant] : variantClasses[variant],
          sizeClasses[size],
          pressed ? "opacity-50" : "",
          disabled ? "bg-gray-400 opacity-80" : "",
          className,
          {
            transitionProperty: "background-color, box-shadow, border-color",
            transitionDuration: "200ms",
          }
        )}
        {...rest}
      >
        <Text className={`${textColor} font-semibold text-center`}>
          {children}
        </Text>
      </Pressable>
    );
  }
);

Button.displayName = "Button";
