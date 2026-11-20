import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import Svg, { Circle } from 'react-native-svg';
import { AppText } from '@/components/ui';
import { ShieldCheckIcon, TrendUpIcon, ChevronRightIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';
import { ScanReport } from '@/types/scan';

interface TelemetryHeroCardProps {
  report?: ScanReport | null;
  userName?: string;
  calibratedHoursAgo?: number;
}

export function TelemetryHeroCard({
  report,
  userName = 'Elena',
  calibratedHoursAgo = 18,
}: TelemetryHeroCardProps) {
  const score = report?.overallScore ?? 88;
  const statusTitle = report?.summaryObservations?.primaryFocus
    ? report.summaryObservations.primaryFocus.replace(/_/g, ' ')
    : 'Radiant & Hydrated';

  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Top Status Row ─────────────────────────────────────── */}
      <View style={styles.topStatusRow}>
        <View style={styles.telemetryTag}>
          <View style={styles.blueDot} />
          <AppText style={styles.telemetryText}>TELEMETRY ACTIVE</AppText>
        </View>

        <View style={styles.shieldBadge}>
          <ShieldCheckIcon size={18} color="#7C3AED" />
        </View>
      </View>

      {/* ── Greeting & Calibration Time ───────────────────────── */}
      <AppText variant="h1" style={styles.greetingText}>
        Welcome back, {userName}
      </AppText>
      <AppText style={styles.calibrationText}>
        Your complexion profile was calibrated {calibratedHoursAgo}h ago
      </AppText>

      {/* ── Score Sub-Card ────────────────────────────────────── */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="View full skin score details"
        onPress={() => router.push('/scan/results')}
        style={({ pressed }) => [styles.scoreCard, pressed && { opacity: 0.92 }]}
      >
        {/* Circular Progress Ring */}
        <View style={styles.ringContainer}>
          <ScoreMeter score={score} size={54} strokeWidth={3.5} />
          <View style={styles.ringCenterText}>
            <AppText style={styles.scoreNumber}>{score}</AppText>
            <AppText style={styles.scoreLabel}>SCORE</AppText>
          </View>
        </View>

        {/* Score Details Text */}
        <View style={styles.scoreDetailsCol}>
          <AppText style={styles.scoreTitle} numberOfLines={1}>
            {statusTitle}
          </AppText>
          <View style={styles.trendRow}>
            <TrendUpIcon size={13} color="#4F46E5" />
            <AppText style={styles.trendText}>+3% improvement from last week</AppText>
          </View>
        </View>

        {/* Right Chevron */}
        <ChevronRightIcon size={18} color="#94A3B8" />
      </Pressable>
    </View>
  );
}

// ─── Circular Score Ring ─────────────────────────────────────────────────────
function ScoreMeter({
  score,
  size = 54,
  strokeWidth = 3.5,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.min(Math.max(score / 100, 0.05), 1);
  const strokeDashoffset = circumference - circumference * progressRatio;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background track */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E2E8F0"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Filled navy arc */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#0B132B"
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
    padding: Spacing.lg - 4,
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  topStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  telemetryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  blueDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#3B82F6',
  },
  telemetryText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#4338CA',
    letterSpacing: 0.9,
  },
  shieldBadge: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.4,
    marginTop: 10,
  },
  calibrationText: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
  },
  scoreCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.lg,
    padding: 12,
    marginTop: Spacing.md,
    gap: 12,
  },
  ringContainer: {
    position: 'relative',
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringCenterText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0B132B',
    lineHeight: 20,
  },
  scoreLabel: {
    fontSize: 7.5,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.6,
  },
  scoreDetailsCol: {
    flex: 1,
    gap: 3,
  },
  scoreTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B132B',
    textTransform: 'capitalize',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },
});
