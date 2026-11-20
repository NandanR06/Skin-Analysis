import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppCard } from './app-card';
import { AppText } from './app-text';
import { AppBadge } from './app-badge';
import { AppProgressBar } from './app-progress';

export interface MetricCardProps {
  title: string;
  valueLabel: string;
  level:
    | 'low'
    | 'moderate'
    | 'elevated'
    | 'minimal'
    | 'mild'
    | 'prominent'
    | 'smooth'
    | 'rough'
    | 'uniform'
    | 'noticeable'
    | string;
  scoreRatio: number; // 0 to 1
  description: string;
  color?: string;
}

export function MetricCard({
  title,
  valueLabel,
  level,
  scoreRatio,
  description,
  color,
}: MetricCardProps) {
  const { colors } = useTheme();

  const getBadgeVariant = () => {
    switch (level) {
      case 'low':
      case 'minimal':
      case 'smooth':
      case 'uniform':
        return 'success';
      case 'moderate':
      case 'mild':
      case 'slight_variation':
        return 'info';
      case 'elevated':
      case 'prominent':
      case 'rough':
      case 'noticeable':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const metricColor =
    color ??
    (getBadgeVariant() === 'success'
      ? colors.success
      : getBadgeVariant() === 'warning'
        ? colors.accentRose
        : colors.primary);

  return (
    <AppCard elevated style={styles.card}>
      <View style={styles.header}>
        <AppText variant="h3">{title}</AppText>
        <AppBadge label={valueLabel} variant={getBadgeVariant()} />
      </View>

      <AppProgressBar
        progress={scoreRatio}
        color={metricColor}
        height={8}
        style={styles.progress}
      />

      <AppText variant="body" muted style={styles.description}>
        {description}
      </AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progress: {
    marginVertical: Spacing.xs,
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
  },
});
