import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { AppText } from '@/components/ui';
import { ShieldCheckIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';
import { ScanReport } from '@/types/scan';

interface HealthIndexCardProps {
  report?: ScanReport | null;
}

export function HealthIndexCard({ report }: HealthIndexCardProps) {
  const score = report?.overallScore ?? 88;
  const timeFormatted = report?.capturedAt
    ? `Today, ${new Date(report.capturedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'Today, 10:42 AM';

  return (
    <View style={styles.container}>
      {/* ── Top Status & Timestamp Row ─────────────────────────── */}
      <View style={styles.topStatusRow}>
        <View style={styles.telemetryTag}>
          <View style={styles.blueDot} />
          <AppText style={styles.telemetryText}>TELEMETRY SYNTHESIZED</AppText>
        </View>
        <AppText style={styles.timestampText}>{timeFormatted}</AppText>
      </View>

      {/* ── Main Index Card ────────────────────────────────────── */}
      <View style={[styles.card, Shadow.sm]}>
        <View style={styles.cardContentRow}>
          {/* Left Details */}
          <View style={styles.leftCol}>
            {/* DERMA-AI SCORE badge */}
            <View style={styles.dermaScoreBadge}>
              <ShieldCheckIcon size={12} color="#7C3AED" />
              <AppText style={styles.dermaScoreText}>DERMA-AI SCORE</AppText>
            </View>

            {/* Title & Subtitle */}
            <AppText variant="h1" style={styles.titleText}>
              Skin Health Index
            </AppText>
            <AppText style={styles.subText} numberOfLines={1}>
              Epidermal barrier & micro-texture calibrated
            </AppText>

            {/* Tier & Comparison Row */}
            <View style={styles.tierRow}>
              <View style={styles.tierPill}>
                <AppText style={styles.tierPillText}>Optimal Tier</AppText>
              </View>
              <AppText style={styles.comparisonText}>+4 pts vs last week</AppText>
            </View>
          </View>

          {/* Right Circular Score Ring (88 /100) */}
          <View style={styles.ringContainer}>
            <ScoreRingProgress score={score} size={70} strokeWidth={4} />
            <View style={styles.ringCenterText}>
              <AppText style={styles.scoreBigText}>{score}</AppText>
              <AppText style={styles.scoreDenominator}>/100</AppText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Circular Score Progress Ring ────────────────────────────────────────────
function ScoreRingProgress({
  score,
  size = 70,
  strokeWidth = 4,
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
      {/* Background Track */}
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#E2E8F0"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Navy Progress Arc */}
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
  container: {
    gap: 8,
  },
  topStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  telemetryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
  },
  telemetryText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 0.8,
  },
  timestampText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xl,
    padding: Spacing.lg - 4,
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  cardContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  leftCol: {
    flex: 1,
    gap: 4,
  },
  dermaScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    gap: 4,
  },
  dermaScoreText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7C3AED',
    letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.4,
    marginTop: 4,
  },
  subText: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  tierPill: {
    backgroundColor: '#FAF7F0',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  tierPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0B132B',
  },
  comparisonText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  ringContainer: {
    position: 'relative',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  ringCenterText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBigText: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0B132B',
    lineHeight: 24,
  },
  scoreDenominator: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    marginTop: -2,
  },
});
