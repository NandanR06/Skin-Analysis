import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Radii, Colors } from '@/constants/theme';

const C = Colors.light;

export interface AppProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export function AppProgressBar({ progress, color, height = 7, style }: AppProgressBarProps) {
  const clamped = Math.max(0, Math.min(1, progress));
  const barColor = color ?? C.primary;

  return (
    <View style={[styles.track, { height, backgroundColor: C.border }, style]}>
      <View
        style={[
          styles.fill,
          {
            width: `${clamped * 100}%`,
            backgroundColor: barColor,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    borderRadius: Radii.pill,
    overflow: 'hidden',
    backgroundColor: '#E5EFEA',
  },
  fill: {
    height: '100%',
    borderRadius: Radii.pill,
  },
});
