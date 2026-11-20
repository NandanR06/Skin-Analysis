import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/ui';
import { DropletIcon, ShieldCheckIcon, SparkleGridIcon, SebumIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';
import { ScanReport } from '@/types/scan';

interface BiometricTelemetryGridProps {
  report?: ScanReport | null;
}

export function BiometricTelemetryGrid({ report }: BiometricTelemetryGridProps) {
  // Extract or calculate dynamic telemetry values if report exists, otherwise use clinical baseline
  const hydrationVal = report?.regions?.forehead?.shineEstimate === 'elevated' ? 95 : 92;
  const barrierVal = report?.overallScore ? Math.round(report.overallScore * 0.95) : 84;
  const smoothnessVal = report?.regions?.leftCheek?.textureEstimate === 'smooth' ? 91 : 89;

  return (
    <View style={styles.section}>
      {/* ── Section Header ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <AppText variant="h2" style={styles.sectionTitle}>
          Biometric Telemetry
        </AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View Deep Analysis"
          onPress={() => router.push('/scan/results')}
          hitSlop={8}
        >
          <AppText style={styles.deepAnalysisText}>Deep Analysis</AppText>
        </Pressable>
      </View>

      {/* ── 2x2 Grid ──────────────────────────────────────────── */}
      <View style={styles.grid}>
        {/* Card 1: Hydration */}
        <TelemetryCard
          icon={
            <View style={[styles.iconCircle, { backgroundColor: '#EEF2FF' }]}>
              <DropletIcon size={18} color="#4F46E5" />
            </View>
          }
          badgeText="+4%"
          badgeBg="#EDE9FE"
          badgeColor="#6366F1"
          label="Hydration"
          value={`${hydrationVal}%`}
          status="Optimal"
          progress={hydrationVal / 100}
          barColor="#4F46E5"
        />

        {/* Card 2: Skin Barrier */}
        <TelemetryCard
          icon={
            <View style={[styles.iconCircle, { backgroundColor: '#FAF5FF' }]}>
              <ShieldCheckIcon size={18} color="#7C3AED" />
            </View>
          }
          badgeText="+1%"
          badgeBg="#EDE9FE"
          badgeColor="#6366F1"
          label="Skin Barrier"
          value={`${barrierVal}%`}
          status="Intact"
          progress={barrierVal / 100}
          barColor="#0B132B"
        />

        {/* Card 3: Smoothness */}
        <TelemetryCard
          icon={
            <View style={[styles.iconCircle, { backgroundColor: '#F8FAFC' }]}>
              <SparkleGridIcon size={18} color="#64748B" />
            </View>
          }
          badgeText="Steady"
          badgeBg="#F1F5F9"
          badgeColor="#475569"
          label="Smoothness"
          value={`${smoothnessVal}%`}
          status="Refined"
          progress={smoothnessVal / 100}
          barColor="#4F46E5"
        />

        {/* Card 4: Sebum / Oil */}
        <TelemetryCard
          icon={
            <View style={[styles.iconCircle, { backgroundColor: '#FAF5FF' }]}>
              <SebumIcon size={18} color="#7C3AED" />
            </View>
          }
          badgeText="Balanced"
          badgeBg="#EDE9FE"
          badgeColor="#7C3AED"
          label="Sebum / Oil"
          value="Zone T"
          status="Optimal"
          progress={0.72}
          barColor="#6366F1"
        />
      </View>
    </View>
  );
}

// ─── Single Telemetry Card ───────────────────────────────────────────────────
interface TelemetryCardProps {
  icon: React.ReactNode;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  label: string;
  value: string;
  status: string;
  progress: number;
  barColor: string;
}

function TelemetryCard({
  icon,
  badgeText,
  badgeBg,
  badgeColor,
  label,
  value,
  status,
  progress,
  barColor,
}: TelemetryCardProps) {
  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* Top Row: Icon + Badge */}
      <View style={styles.cardTopRow}>
        {icon}
        <View style={[styles.pillBadge, { backgroundColor: badgeBg }]}>
          <AppText style={[styles.pillText, { color: badgeColor }]}>{badgeText}</AppText>
        </View>
      </View>

      {/* Label */}
      <AppText style={styles.cardLabel}>{label}</AppText>

      {/* Metric Value & Sub-status */}
      <View style={styles.valueRow}>
        <AppText style={styles.valueText}>{value}</AppText>
        <AppText style={styles.statusText}>{status}</AppText>
      </View>

      {/* Progress Bar */}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${progress * 100}%`, backgroundColor: barColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.3,
  },
  deepAnalysisText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#4F46E5',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1EFEA',
    gap: 6,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  cardLabel: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  valueText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: -0.4,
  },
  statusText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  track: {
    width: '100%',
    height: 5,
    borderRadius: Radii.pill,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
    marginTop: 4,
  },
  fill: {
    height: '100%',
    borderRadius: Radii.pill,
  },
});
