import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Radii, Colors } from '@/constants/theme';
import { AppText } from './app-text';

const C = Colors.light;

export type BadgeVariant = 'success' | 'warning' | 'info' | 'neutral' | 'accentRose' | 'error';

export interface AppBadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
}

export function AppBadge({ label, variant = 'neutral', style }: AppBadgeProps) {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: '#D1FAE5', text: '#065F46' };
      case 'warning':
        return { bg: '#FEF3C7', text: '#92400E' };
      case 'info':
        return { bg: C.primaryLight, text: C.primary };
      case 'accentRose':
        return { bg: '#FDECEA', text: '#B91C1C' };
      case 'error':
        return { bg: '#FEE2E2', text: '#B91C1C' };
      default:
        return { bg: C.secondary, text: C.textSecondary };
    }
  };

  const { bg, text } = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <AppText variant="caption" style={[styles.text, { color: text }]}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
