import cn from "classnames";
import { View as RNView, type ViewProps } from "react-native";

export type Props = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function View({ className, ...otherProps }: Props) {
  return <RNView className={cn("bg-background", className)} {...otherProps} />;
}
