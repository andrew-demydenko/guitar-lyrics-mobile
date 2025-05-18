import { useRouter, Href } from "expo-router";
import React, { useState, useCallback } from "react";
import { Pressable, Text, PressableProps } from "react-native";
import { style } from "twrnc";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
  href?: Href;
  type?: "button" | "submit" | "reset";
  form?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  isActive = false,
  disabled = false,
  size = "md",
  variant = "primary",
  onPress,
  href,
  ...rest
}) => {
  const [pressed, setPressed] = useState(false);
  const router = useRouter();

  const handlePressOut = useCallback(() => {
    setPressed(false);
  }, []);

  const handlePressIn = useCallback(() => {
    if (isActive) return;
    setPressed(true);
  }, [isActive]);

  const sizeClasses = {
    sm: "py-2 px-3 rounded-md",
    md: "py-3 px-4 rounded-lg",
    lg: "py-4 px-6 rounded-xl",
  };

  const variantClasses = {
    primary: "bg-blue-600 active:bg-blue-700",
    secondary: "bg-gray-600 active:bg-gray-700",
    outline: "border-2 border-blue-500 bg-transparent active:bg-blue-100",
    danger: "bg-red-500 active:bg-red-600",
    success: "bg-green-500 active:bg-green-600",
  };

  const textColor = variant === "outline" ? "text-blue-600" : "text-white";

  return (
    <Pressable
      disabled={isActive || disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style(
        "flex-row items-center justify-center",
        variantClasses[variant],
        sizeClasses[size],
        pressed ? "opacity-20" : "",
        isActive ? "opacity-75" : "",
        disabled ? "bg-gray-400 opacity-80" : "",
        className,
        {
          transitionProperty: "background-color, opacity",
          transitionDuration: "200ms",
        }
      )}
      onPress={href ? () => router.push(href) : onPress}
      {...rest}
    >
      <Text style={style(`${textColor} font-semibold text-center`)}>
        {children}
      </Text>
    </Pressable>
  );
};
