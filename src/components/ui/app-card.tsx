import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Radii, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';

export interface AppCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
}

export function AppCard({ children, style, elevated = false }: AppCardProps) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: elevated ? colors.surfaceElevated : colors.card,
          borderColor: colors.cardBorder,
          shadowColor: isDark ? '#000' : '#1E293B',
        },
        elevated && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: Radii.lg,
    borderWidth: 1,
  },
  elevated: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
});
