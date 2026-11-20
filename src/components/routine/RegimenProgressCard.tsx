import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { AppText } from '@/components/ui';
import { Spacing, Radii, Shadow } from '@/constants/theme';

interface RegimenProgressCardProps {
  completedSteps?: number;
  totalSteps?: number;
}

export function RegimenProgressCard({
  completedSteps = 3,
  totalSteps = 4,
}: RegimenProgressCardProps) {
  const progressRatio = completedSteps / totalSteps;
  const percentage = Math.round(progressRatio * 100);

  return (
    <View style={[styles.card, Shadow.sm]}>
      <View style={styles.contentRow}>
        {/* Left Circular Ring Meter */}
        <View style={styles.ringWrapper}>
          <ProgressRing progress={progressRatio} size={76} strokeWidth={4.5} />
          <View style={styles.ringCenterText}>
            <AppText style={styles.stepsRatioText}>
              {completedSteps}/{totalSteps}
            </AppText>
            <AppText style={styles.stepsLabel}>STEPS</AppText>
          </View>
        </View>

        {/* Right Details */}
        <View style={styles.detailsCol}>
          {/* Sync Pill */}
          <View style={styles.syncBadge}>
            <View style={styles.blueDot} />
            <AppText style={styles.syncText}>FACE SCAN SYNC : ACTIVE</AppText>
          </View>

          {/* Progress Title */}
          <AppText style={styles.titleText}>{percentage}% Completed</AppText>

          {/* Subtitle */}
          <AppText style={styles.subText} numberOfLines={2}>
            {completedSteps < totalSteps
              ? `${totalSteps - completedSteps} step left to lock in hydration barrier protection for the next 8 hours.`
              : 'All daily steps completed! Hydration barrier fortified.'}
          </AppText>

          {/* Live Telemetry Data Line */}
          <View style={styles.telemetryLine}>
            <AppText style={styles.hydrationText}>Hydration Level: 74%</AppText>
            <AppText style={styles.dotSep}>•</AppText>
            <AppText style={styles.uvText}>UV Index: 6.2</AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── SVG Progress Ring ───────────────────────────────────────────────────────
function ProgressRing({
  progress,
  size = 76,
  strokeWidth = 4.5,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - circumference * Math.min(Math.max(progress, 0.05), 1);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E2E8F0"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#4F46E5"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        fill="none"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xl,
    padding: Spacing.md + 2,
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ringWrapper: {
    position: 'relative',
    width: 76,
    height: 76,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  ringCenterText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepsRatioText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0B132B',
    lineHeight: 22,
  },
  stepsLabel: {
    fontSize: 8.5,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  detailsCol: {
    flex: 1,
    gap: 3,
  },
  syncBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    gap: 5,
  },
  blueDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#3B82F6',
  },
  syncText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7C3AED',
    letterSpacing: 0.6,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.3,
    marginTop: 2,
  },
  subText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  telemetryLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  hydrationText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
  },
  dotSep: {
    fontSize: 10,
    color: '#94A3B8',
  },
  uvText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#D97706',
  },
});
