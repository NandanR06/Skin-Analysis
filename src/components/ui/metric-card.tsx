import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spacing, Colors } from '@/constants/theme';
import { AppCard } from './app-card';
import { AppText } from './app-text';
import { AppBadge } from './app-badge';
import { AppProgressBar } from './app-progress';

const C = Colors.light;

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
  scoreRatio: number;
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
  const getBadgeVariant = (): 'success' | 'info' | 'warning' | 'neutral' => {
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

  const variant = getBadgeVariant();
  const metricColor =
    color ?? (variant === 'success' ? C.success : variant === 'warning' ? C.accentRose : C.primary);

  return (
    <AppCard elevated style={styles.card}>
      <View style={styles.header}>
        <AppText variant="h3" style={{ flex: 1 }}>
          {title}
        </AppText>
        <AppBadge label={valueLabel} variant={variant} />
      </View>

      <AppProgressBar progress={scoreRatio} color={metricColor} height={8} />

      <AppText variant="body" color={C.textSecondary} style={styles.desc}>
        {description}
      </AppText>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { gap: Spacing.sm },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  desc: { fontSize: 13, lineHeight: 18 },
});
