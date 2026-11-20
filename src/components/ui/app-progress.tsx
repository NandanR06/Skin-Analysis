import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Radii } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';

export interface AppProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export function AppProgressBar({ progress, color, height = 6, style }: AppProgressBarProps) {
  const { colors } = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));
  const barColor = color ?? colors.primary;

  return (
    <View style={[styles.track, { height, backgroundColor: colors.border }, style]}>
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
  },
  fill: {
    height: '100%',
    borderRadius: Radii.pill,
  },
});
