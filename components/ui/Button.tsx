import cn from "classnames";
import { Href, router } from "expo-router";
import { cssInterop } from "nativewind";
import React, { forwardRef, useCallback } from "react";
import { GestureResponderEvent, View } from "react-native";
import {
  Button as RNButton,
  ButtonProps as RNButtonProps,
} from "react-native-paper";
import { useThemeColor, ThemeColorName } from "@/hooks/useThemeColor";
import { darken } from "@/lib/common";

export interface ButtonProps extends RNButtonProps {
  children: React.ReactNode;
  className?: string;
  labelClass?: string;
  contentClass?: string;
  disabled?: boolean;
  isActive?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  href?: Href;
  buttonColor?: "primary" | "secondary" | "danger" | "success" | "info";
}

const StyledButton = cssInterop(RNButton, {
  className: {
    target: "style",
  },
  labelClass: {
    target: "labelStyle",
  },
  contentClass: {
    target: "contentStyle",
  },
});

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      children,
      className = "",
      isActive = false,
      disabled = false,
      size = "md",
      onPressIn: externalPressIn,
      onPressOut: externalPressOut,
      onPress: externalOnPress,
      href,
      mode = "elevated",
      buttonColor = "primary",
      labelClass,
      ...rest
    },
    ref
  ) => {
    const { getThemeColor, getColor } = useThemeColor();

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
      xs: "my-0 mx-2",
      sm: "my-2 mx-4",
      md: "my-3 mx-5",
      lg: "my-4 mx-6",
    };

    const grayColor = getColor("gray", "200");
    const btnColor = getThemeColor(buttonColor) as ThemeColorName;
    const defaultColor = getThemeColor("background") as ThemeColorName;
    let backgroundColor = isActive ? darken(btnColor, 20) : btnColor;
    let textColor = defaultColor;

    if (mode === "text") {
      backgroundColor = "transparent";
      textColor = isActive
        ? (darken(btnColor, 20) as ThemeColorName)
        : btnColor;
    }

    if (mode === "outlined") {
      backgroundColor = isActive ? grayColor : defaultColor;
      textColor = btnColor;
    }

    return (
      <StyledButton
        ref={ref}
        buttonColor={backgroundColor}
        textColor={textColor}
        mode={mode}
        disabled={disabled}
        onPress={!isActive ? handlePress : undefined}
        labelClass={cn(sizeClasses[size], labelClass)}
        className={cn(
          "flex-column items-stretch justify-center min-w-0",
          className
        )}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = "Button";
