import cn from "classnames";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";

export type TextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  className?: string;
  currentColor?: boolean;
  color?:
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "info"
    | "black"
    | "white";
};

export function Text({
  type = "default",
  className,
  currentColor,
  color,
  ...rest
}: TextProps) {
  const classes = {
    default: "text-base",
    title: "text-2xl font-bold",
    defaultSemiBold: "text-lg font-semibold",
    subtitle: "text-lg font-bold",
    link: "text-blue-500",
  };

  const colorClasses = {
    primary: "text-primary",
    secondary: "text-secondary",
    danger: "text-red-500",
    warning: "text-yellow-500",
    success: "text-green-500",
    info: "text-blue-500",
    black: "text-black",
    white: "text-white",
  };
  return (
    <RNText
      className={cn(
        classes[type],
        className,
        !currentColor && color && colorClasses[color],
        currentColor ? "text-current" : ""
      )}
      {...rest}
    />
  );
}
