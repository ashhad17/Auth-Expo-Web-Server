// This component is a placeholder for SF Symbols on iOS and Material Icons on Android
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type IconSymbolProps = {
  name: string;
  size?: number;
  color?: string;
};

// Simple mapping of common icon names to Ionicons
const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  "house.fill": "home",
  "list.bullet": "list",
  "plus.circle.fill": "add-circle",
  "person.2.fill": "people",
  "person.fill": "person",
};

export function IconSymbol({ name, size = 24, color = "#000" }: IconSymbolProps) {
  const ioniconsName = iconMap[name] || "help";
  
  return (
    <Ionicons 
      name={ioniconsName} 
      size={size} 
      color={color}
    />
  );
}
