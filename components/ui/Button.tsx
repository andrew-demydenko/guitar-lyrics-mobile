import React from "react";
import { Pressable, Text, PressableProps } from "react-native";
import { style } from "twrnc";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "danger" | "success";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  isActive = true,
  size = "md",
  variant = "primary",
  ...rest
}) => {
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
      {...rest}
      disabled={!isActive}
      style={({ pressed }) =>
        style(
          "flex-row items-center justify-center transition-all duration-100",
          pressed ? "scale-95" : "",
          variantClasses[variant],
          sizeClasses[size],
          !isActive && "opacity-60",
          className
        )
      }
    >
      <Text style={style(`${textColor} font-semibold text-center`)}>
        {children}
      </Text>
    </Pressable>
  );
};
