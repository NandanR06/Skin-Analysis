import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppText, AppButton, AppCard, AppBadge } from '../../components/ui';
import { useTheme } from '../../hooks/use-theme';
import { Spacing, Radii } from '../../constants/theme';
import { useScanStore } from '../../store/useScanStore';
import { useProfileStore } from '../../store/useProfileStore';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { currentReport, loadScanHistory } = useScanStore();
  const { profile, loadProfile } = useProfileStore();

  useEffect(() => {
    loadScanHistory();
    loadProfile();
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Greeting */}
        <View style={styles.header}>
          <AppText variant="caption" muted style={styles.kicker}>
            COSMETIC SKIN WELLNESS
          </AppText>
          <AppText variant="display">Face Scan & Analysis</AppText>
          <AppText variant="body" muted>
            On-device non-diagnostic skin observations and tailored ingredient guidance.
          </AppText>
        </View>

        {/* Hero Scan Call To Action */}
        <AppCard elevated style={[styles.heroCard, { backgroundColor: colors.primary }]}>
          <View style={styles.heroBadgeRow}>
            <AppBadge
              label="Camera Ready"
              variant="info"
              style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
            />
            <AppText variant="caption" color="rgba(255,255,255,0.85)">
              100% On-Device & Private
            </AppText>
          </View>
          <AppText variant="h1" color={colors.primaryForeground}>
            Begin Face Scan
          </AppText>
          <AppText variant="body" color="rgba(255,255,255,0.9)" style={styles.heroDescription}>
            Position your face within the guide under balanced lighting to evaluate shine, redness,
            texture, and tone.
          </AppText>
          <AppButton
            title="Start Face Scan"
            onPress={() => router.push('/scan/camera')}
            variant="secondary"
            size="lg"
            style={styles.heroButton}
          />
        </AppCard>

        {/* Skin Questionnaire Status */}
        {!profile.completedAt ? (
          <AppCard elevated style={styles.questionnaireBanner}>
            <View style={styles.bannerHeader}>
              <AppBadge label="Profile Incomplete" variant="warning" />
              <AppText variant="caption" muted>
                Takes 1 min
              </AppText>
            </View>
            <AppText variant="h2">Complete Skin Profile</AppText>
            <AppText variant="body" muted>
              Answer 5 quick questions about skin feel and sensitivity to personalize your routine.
            </AppText>
            <AppButton
              title="Answer Questionnaire"
              onPress={() => router.push('/questionnaire')}
              variant="outline"
              size="md"
            />
          </AppCard>
        ) : null}

        {/* Latest Scan Overview */}
        {currentReport ? (
          <AppCard elevated style={styles.latestCard}>
            <View style={styles.latestHeader}>
              <View>
                <AppText variant="caption" muted>
                  LATEST OBSERVATION
                </AppText>
                <AppText variant="h2">{currentReport.summaryObservations.primaryFocus}</AppText>
              </View>
              <View style={[styles.scoreBadge, { backgroundColor: colors.secondary }]}>
                <AppText variant="h1" color={colors.primary}>
                  {currentReport.overallScore}
                </AppText>
                <AppText variant="caption" muted>
                  Clarity Index
                </AppText>
              </View>
            </View>

            <View style={styles.metricGrid}>
              <View style={styles.metricItem}>
                <AppText variant="caption" muted>
                  Shine
                </AppText>
                <AppText variant="h3">{currentReport.summaryObservations.shineOverall}</AppText>
              </View>
              <View style={styles.metricItem}>
                <AppText variant="caption" muted>
                  Redness
                </AppText>
                <AppText variant="h3">{currentReport.summaryObservations.rednessOverall}</AppText>
              </View>
              <View style={styles.metricItem}>
                <AppText variant="caption" muted>
                  Texture
                </AppText>
                <AppText variant="h3">{currentReport.summaryObservations.textureOverall}</AppText>
              </View>
              <View style={styles.metricItem}>
                <AppText variant="caption" muted>
                  Tone
                </AppText>
                <AppText variant="h3">{currentReport.summaryObservations.toneOverall}</AppText>
              </View>
            </View>

            <View style={styles.actionRow}>
              <AppButton
                title="View Full Report"
                onPress={() => router.push('/scan/results')}
                variant="outline"
                size="sm"
              />
              <AppButton
                title="View Routine"
                onPress={() => router.push('/routine')}
                variant="primary"
                size="sm"
              />
            </View>
          </AppCard>
        ) : (
          <AppCard elevated style={styles.emptyCard}>
            <AppText variant="h3">No Scans Recorded Yet</AppText>
            <AppText variant="body" muted>
              Complete your first scan above or choose a sample scan to view cosmetic observations
              and tailored routines.
            </AppText>
          </AppCard>
        )}

        {/* Ethical Disclaimer */}
        <View style={styles.disclaimerBox}>
          <AppText variant="caption" muted style={styles.disclaimerText}>
            Notice: This application provides cosmetic skin estimations only. It is not a medical
            device, does not diagnose skin conditions, and does not replace medical advice.
          </AppText>
        </View>
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
  header: {
    gap: Spacing.xs,
  },
  kicker: {
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroCard: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  heroButton: {
    marginTop: Spacing.xs,
  },
  questionnaireBanner: {
    gap: Spacing.sm,
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  latestCard: {
    gap: Spacing.md,
  },
  latestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scoreBadge: {
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: Radii.md,
  },
  metricGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  metricItem: {
    alignItems: 'center',
    gap: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  emptyCard: {
    alignItems: 'center',
    textAlign: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.xl,
  },
  disclaimerBox: {
    paddingHorizontal: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  disclaimerText: {
    textAlign: 'center',
    lineHeight: 18,
  },
});
