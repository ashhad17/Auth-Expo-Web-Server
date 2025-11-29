import { type ComponentProps } from "react";
import { TouchableOpacity, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";

export function HapticTab({ children, onPress, ...props }: BottomTabBarButtonProps) {
  return (
    <TouchableOpacity
      onPress={(e) => {
        // Only use haptics on native platforms (iOS/Android)
        if (Platform.OS !== 'web') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPress?.(e);
      }}
      {...(props as any)}
    >
      {children}
    </TouchableOpacity>
  );
}
