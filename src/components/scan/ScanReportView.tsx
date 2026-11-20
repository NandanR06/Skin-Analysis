import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppText, AppButton, AppCard, AppBadge, MetricCard } from '@/components/ui';
import { Spacing, Radii, Colors } from '@/constants/theme';
import { ScanReport } from '@/types/scan';

const C = Colors.light;

export interface ScanReportViewProps {
  report: ScanReport;
  onReturn?: () => void;
}

export function ScanReportView({ report, onReturn }: ScanReportViewProps) {
  const getScoreRatio = (level: string) => {
    switch (level) {
      case 'low':
      case 'minimal':
      case 'smooth':
      case 'uniform':
        return 0.25;
      case 'moderate':
      case 'mild':
      case 'slight_variation':
        return 0.55;
      case 'elevated':
      case 'prominent':
      case 'rough':
      case 'noticeable':
        return 0.85;
      default:
        return 0.5;
    }
  };

  const score = report.overallScore;
  const scoreColor = score >= 75 ? C.success : score >= 50 ? C.warning : C.error;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Header ───────────────────────────────── */}
        <View style={styles.header}>
          <AppText variant="overline" color={C.textMuted}>
            COSMETIC REPORT
          </AppText>
          <AppText variant="h1" style={{ marginTop: 2 }}>
            Scan Observations
          </AppText>
          <AppText variant="caption" color={C.textMuted} style={{ marginTop: 4 }}>
            {new Date(report.capturedAt).toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </AppText>
        </View>

        {/* ── Score Hero ───────────────────────────── */}
        <View style={styles.scoreHero}>
          <View style={[styles.scoreRing, { borderColor: scoreColor }]}>
            <AppText variant="display" color={scoreColor}>
              {report.overallScore}
            </AppText>
            <AppText variant="caption" color={C.textMuted}>
              Clarity
            </AppText>
          </View>

          <View style={styles.scoreRight}>
            <AppText variant="overline" color={C.textMuted}>
              PRIMARY FOCUS
            </AppText>
            <AppText variant="h2" style={{ marginTop: 4 }}>
              {report.summaryObservations.primaryFocus}
            </AppText>
            <View style={styles.badgeRow}>
              <AppBadge
                label={`Quality: ${report.imageQuality.status}`}
                variant={report.imageQuality.status === 'good' ? 'success' : 'warning'}
              />
              <AppBadge
                label={`${report.overallConfidence} confidence`}
                variant={report.overallConfidence === 'high' ? 'info' : 'neutral'}
              />
            </View>
          </View>
        </View>

        {/* ── Metric Cards ─────────────────────────── */}
        <View style={styles.sectionHeader}>
          <AppText variant="h2">Cosmetic Indicators</AppText>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard
            title="✨ Surface Shine"
            valueLabel={report.summaryObservations.shineOverall}
            level={report.summaryObservations.shineOverall}
            scoreRatio={getScoreRatio(report.summaryObservations.shineOverall)}
            description="Light reflection patterns across the forehead & nose."
          />
          <MetricCard
            title="🌸 Cheek Redness"
            valueLabel={report.summaryObservations.rednessOverall}
            level={report.summaryObservations.rednessOverall}
            scoreRatio={getScoreRatio(report.summaryObservations.rednessOverall)}
            description="Chromatic redness across cheek regions."
            color={C.accentRose}
          />
          <MetricCard
            title="🌿 Micro-Texture"
            valueLabel={report.summaryObservations.textureOverall}
            level={report.summaryObservations.textureOverall}
            scoreRatio={getScoreRatio(report.summaryObservations.textureOverall)}
            description="Surface smoothness and fine edge contrast."
          />
          <MetricCard
            title="🎨 Tone Uniformity"
            valueLabel={report.summaryObservations.toneOverall}
            level={report.summaryObservations.toneOverall}
            scoreRatio={getScoreRatio(report.summaryObservations.toneOverall)}
            description="Bilateral colour distribution symmetry."
          />
        </View>

        {/* ── Zone Breakdown ───────────────────────── */}
        <AppCard elevated style={styles.regionCard}>
          <AppText variant="h2" style={{ marginBottom: Spacing.sm }}>
            Facial Zone Breakdown
          </AppText>
          <ZoneRow label="Forehead" note={report.regions.forehead.notes} />
          <ZoneRow label="Malar Cheeks" note={report.regions.leftCheek.notes} />
          <ZoneRow label="Nasal Bridge & Chin" note={report.regions.nose.notes} />
          <ZoneRow label="Under-Eye Contour" note={report.regions.underEye.notes} isLast />
        </AppCard>

        {/* ── CTA Buttons ──────────────────────────── */}
        <View style={styles.ctaBox}>
          <AppButton
            title="View Personalized Routine →"
            onPress={() => router.push('/routine')}
            variant="primary"
            size="lg"
          />
          <AppButton
            title="Return to Dashboard"
            onPress={onReturn ?? (() => router.replace('/(tabs)'))}
            variant="outline"
            size="md"
          />
        </View>

        {/* ── Disclaimer Card ──────────────────────── */}
        <AppCard tinted style={styles.disclaimerCard}>
          <AppText variant="h3">📋 Limitations & Disclaimers</AppText>
          <View style={{ marginTop: Spacing.sm, gap: 4 }}>
            {report.limitations.map((limit, idx) => (
              <AppText key={idx} variant="caption" color={C.textSecondary}>
                · {limit}
              </AppText>
            ))}
          </View>
          <AppText
            variant="caption"
            color={C.textMuted}
            style={{ marginTop: Spacing.sm, lineHeight: 18 }}
          >
            {report.disclaimer}
          </AppText>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

function ZoneRow({ label, note, isLast }: { label: string; note: string; isLast?: boolean }) {
  return (
    <View style={[zoneStyles.row, !isLast && zoneStyles.bordered]}>
      <AppText variant="h3">{label}</AppText>
      <AppText variant="caption" color={C.textMuted} style={{ marginTop: 2 }}>
        {note}
      </AppText>
    </View>
  );
}

const zoneStyles = StyleSheet.create({
  row: { paddingVertical: Spacing.sm, gap: 2 },
  bordered: { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: C.border },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.background },
  scroll: { padding: Spacing.lg, gap: Spacing.md, paddingBottom: Spacing['2xl'] },
  header: { gap: 0 },
  scoreHero: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    gap: Spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.cardBorder,
    shadowColor: C.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 4,
  },
  scoreRing: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  scoreRight: { flex: 1, gap: 0 },
  badgeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginTop: Spacing.sm },
  sectionHeader: { gap: 0 },
  metricsGrid: { gap: Spacing.sm },
  regionCard: { padding: Spacing.lg, gap: 0 },
  ctaBox: { gap: Spacing.sm },
  disclaimerCard: { gap: 0 },
});
