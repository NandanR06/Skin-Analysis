import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Radii, Spacing, Shadow } from '@/constants/theme';

export interface AppCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
  tinted?: boolean;
}

export function AppCard({ children, style, elevated = false, tinted = false }: AppCardProps) {
  return (
    <View style={[styles.card, elevated && styles.elevated, tinted && styles.tinted, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: Radii.lg,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5EFEA',
  },
  elevated: {
    ...Shadow.md,
    borderWidth: 0,
  },
  tinted: {
    backgroundColor: '#EEF5F1',
    borderWidth: 0,
  },
});
