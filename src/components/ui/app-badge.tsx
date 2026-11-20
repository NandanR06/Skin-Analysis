import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Radii, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from './app-text';

export type BadgeVariant = 'success' | 'warning' | 'info' | 'neutral' | 'accentRose';

export interface AppBadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: StyleProp<ViewStyle>;
}

export function AppBadge({ label, variant = 'neutral', style }: AppBadgeProps) {
  const { colors } = useTheme();

  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: colors.success + '20', text: colors.success };
      case 'warning':
        return { bg: colors.warning + '20', text: colors.warning };
      case 'info':
        return { bg: colors.primary + '18', text: colors.primary };
      case 'accentRose':
        return { bg: colors.accentRose + '20', text: colors.accentRose };
      default:
        return { bg: colors.secondary, text: colors.textSecondary };
    }
  };

  const badgeTheme = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: badgeTheme.bg }, style]}>
      <AppText variant="caption" style={[styles.text, { color: badgeTheme.text }]}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
    borderRadius: Radii.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
