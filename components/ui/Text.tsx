import cn from "classnames";
import { Text as RNText, type TextProps } from "react-native";

export type Props = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function Text({ type = "default", ...rest }: Props) {
  const classes = {
    default: "text-base",
    title: "text-2xl font-bold",
    defaultSemiBold: "text-lg font-semibold",
    subtitle: "text-lg font-bold",
    link: "text-blue-500",
  };
  return <RNText className={cn("text-text", classes[type])} {...rest} />;
}
