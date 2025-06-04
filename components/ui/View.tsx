import cn from "classnames";
import { forwardRef } from "react";
import { View as RNView, type ViewProps as RNViewProps } from "react-native";

export interface ViewProps extends RNViewProps {
  lightColor?: string;
  darkColor?: string;
}

export const View = forwardRef<RNView, ViewProps>(
  ({ className, ...otherProps }, ref) => {
    return (
      <RNView
        ref={ref}
        className={cn("bg-background", className)}
        {...otherProps}
      />
    );
  }
);

View.displayName = "View";
