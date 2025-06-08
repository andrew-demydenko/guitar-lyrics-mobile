import { forwardRef } from "react";
import { View as RNView, type ViewProps as RNViewProps } from "react-native";

export const View = forwardRef<RNView, RNViewProps>(
  ({ className, ...otherProps }, ref) => {
    return <RNView ref={ref} className={className} {...otherProps} />;
  }
);

View.displayName = "View";
