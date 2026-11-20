import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppText, AppButton, AppCard, AppBadge, MetricCard } from '../../components/ui';
import { useTheme } from '../../hooks/use-theme';
import { Spacing, Radii } from '../../constants/theme';
import { useScanStore } from '../../store/useScanStore';
import { getPresetReport } from '../../features/analysis/sampleScans';

export default function ResultsScreen() {
  const { colors } = useTheme();
  const { currentReport } = useScanStore();

  const report = currentReport ?? getPresetReport('preset_balanced');

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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Bar */}
        <View style={styles.headerBar}>
          <AppText variant="caption" muted style={styles.kicker}>
            COSMETIC REPORT
          </AppText>
          <AppText variant="display">Scan Observations</AppText>
          <AppText variant="caption" muted>
            Captured on{' '}
            {new Date(report.capturedAt).toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </AppText>
        </View>

        {/* Overall Clarity Score Hero Card */}
        <AppCard elevated style={[styles.heroScoreCard, { borderColor: colors.primary }]}>
          <View style={styles.heroScoreTop}>
            <View>
              <AppText variant="caption" muted>
                PRIMARY COSMETIC FOCUS
              </AppText>
              <AppText variant="h1" color={colors.primary}>
                {report.summaryObservations.primaryFocus}
              </AppText>
            </View>
            <View style={[styles.scoreBubble, { backgroundColor: colors.secondary }]}>
              <AppText variant="display" color={colors.primary}>
                {report.overallScore}
              </AppText>
              <AppText variant="caption" muted>
                Index
              </AppText>
            </View>
          </View>

          <View style={styles.qualityRow}>
            <AppBadge
              label={`Quality: ${report.imageQuality.status}`}
              variant={report.imageQuality.status === 'good' ? 'success' : 'warning'}
            />
            <AppBadge
              label={`Confidence: ${report.overallConfidence}`}
              variant={report.overallConfidence === 'high' ? 'info' : 'neutral'}
            />
          </View>
        </AppCard>

        {/* Core Cosmetic Metric Cards */}
        <View style={styles.metricsSection}>
          <AppText variant="h2">Cosmetic Indicators</AppText>

          <MetricCard
            title="✨ Surface Shine / Specular Highlight"
            valueLabel={report.summaryObservations.shineOverall}
            level={report.summaryObservations.shineOverall}
            scoreRatio={getScoreRatio(report.summaryObservations.shineOverall)}
            description="Estimates light reflection patterns across the forehead and nose. Higher shine typically indicates natural sebum presence."
          />

          <MetricCard
            title="🌸 Cheek Redness Appearance"
            valueLabel={report.summaryObservations.rednessOverall}
            level={report.summaryObservations.rednessOverall}
            scoreRatio={getScoreRatio(report.summaryObservations.rednessOverall)}
            description="Calculates relative chromatic redness across cheek regions. Sun, heat, or sensitive skin reactions can elevate this value."
            color={colors.accentRose}
          />

          <MetricCard
            title="🌿 Micro-Texture Variance"
            valueLabel={report.summaryObservations.textureOverall}
            level={report.summaryObservations.textureOverall}
            scoreRatio={getScoreRatio(report.summaryObservations.textureOverall)}
            description="Evaluates local surface smoothness and fine edge contrast. Camera distance and focus influence texture estimation."
          />

          <MetricCard
            title="🎨 Bilateral Tone Uniformity"
            valueLabel={report.summaryObservations.toneOverall}
            level={report.summaryObservations.toneOverall}
            scoreRatio={getScoreRatio(report.summaryObservations.toneOverall)}
            description="Compares symmetrical color distribution between both sides of the face to identify uneven areas."
          />
        </View>

        {/* Facial Region Breakdown */}
        <AppCard elevated style={styles.regionCard}>
          <AppText variant="h2">Facial Zone Breakdown</AppText>

          <View style={styles.regionList}>
            <View style={styles.regionItem}>
              <AppText variant="h3">Forehead</AppText>
              <AppText variant="caption" muted>
                {report.regions.forehead.notes}
              </AppText>
            </View>

            <View style={styles.regionItem}>
              <AppText variant="h3">Malar Cheeks (Left & Right)</AppText>
              <AppText variant="caption" muted>
                {report.regions.leftCheek.notes}
              </AppText>
            </View>

            <View style={styles.regionItem}>
              <AppText variant="h3">Nasal Bridge & Chin</AppText>
              <AppText variant="caption" muted>
                {report.regions.nose.notes}
              </AppText>
            </View>

            <View style={styles.regionItem}>
              <AppText variant="h3">Under-Eye Contour</AppText>
              <AppText variant="caption" muted>
                {report.regions.underEye.notes}
              </AppText>
            </View>
          </View>
        </AppCard>

        {/* Next Step Action Button */}
        <View style={styles.ctaBox}>
          <AppButton
            title="View Personalized Skincare Routine"
            onPress={() => router.push('/routine')}
            variant="primary"
            size="lg"
          />
          <AppButton
            title="Return to Dashboard"
            onPress={() => router.replace('/(tabs)')}
            variant="outline"
            size="md"
          />
        </View>

        {/* Limitations & Ethical Disclaimer */}
        <AppCard elevated style={styles.disclaimerCard}>
          <AppText variant="h3">📋 Limitations & Disclaimers</AppText>
          {report.limitations.map((limit, idx) => (
            <AppText key={idx} variant="caption" muted>
              • {limit}
            </AppText>
          ))}
          <AppText variant="caption" color={colors.textSecondary} style={{ marginTop: Spacing.xs }}>
            {report.disclaimer}
          </AppText>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  headerBar: {
    gap: Spacing.xs,
  },
  kicker: {
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroScoreCard: {
    padding: Spacing.lg,
    gap: Spacing.md,
    borderWidth: 1.5,
  },
  heroScoreTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scoreBubble: {
    width: 68,
    height: 68,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qualityRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  metricsSection: {
    gap: Spacing.md,
  },
  regionCard: {
    gap: Spacing.md,
  },
  regionList: {
    gap: Spacing.sm,
  },
  regionItem: {
    paddingVertical: Spacing.xs,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
    gap: 2,
  },
  ctaBox: {
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  disclaimerCard: {
    gap: Spacing.xs,
    backgroundColor: '#FAF9F6',
  },
});
