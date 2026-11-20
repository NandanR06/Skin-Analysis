import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppText, AppButton, AppCard, AppBadge } from '../../components/ui';
import { useTheme } from '../../hooks/use-theme';
import { Spacing, Radii } from '../../constants/theme';
import { useScanStore } from '../../store/useScanStore';
import { useProfileStore } from '../../store/useProfileStore';
import { buildPersonalizedPlan } from '../../features/recommendations/routineBuilder';
import { getPresetReport } from '../../features/analysis/sampleScans';

export default function RoutineScreen() {
  const { colors } = useTheme();
  const { currentReport } = useScanStore();
  const { profile } = useProfileStore();
  const [activeTab, setActiveTab] = useState<'AM' | 'PM'>('AM');

  // Fallback to baseline preset if user hasn't scanned yet
  const effectiveReport = currentReport ?? getPresetReport('preset_balanced');
  const plan = buildPersonalizedPlan(effectiveReport, profile);
  const activeSteps = activeTab === 'AM' ? plan.morningRoutine : plan.eveningRoutine;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <AppText variant="caption" muted style={styles.kicker}>
            TARGETED SKINCARE REGIMEN
          </AppText>
          <AppText variant="display">Daily Routine</AppText>
          <AppText variant="body" muted>
            {plan.summary}
          </AppText>
        </View>

        {/* AM / PM Segmented Control */}
        <View style={[styles.segmentedTrack, { backgroundColor: colors.secondary }]}>
          <Pressable
            onPress={() => setActiveTab('AM')}
            style={[
              styles.segmentBtn,
              activeTab === 'AM' && [styles.segmentActive, { backgroundColor: colors.surface }],
            ]}
          >
            <AppText
              variant="h3"
              color={activeTab === 'AM' ? colors.primary : colors.textSecondary}
            >
              ☀️ Morning (AM)
            </AppText>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('PM')}
            style={[
              styles.segmentBtn,
              activeTab === 'PM' && [styles.segmentActive, { backgroundColor: colors.surface }],
            ]}
          >
            <AppText
              variant="h3"
              color={activeTab === 'PM' ? colors.primary : colors.textSecondary}
            >
              🌙 Evening (PM)
            </AppText>
          </Pressable>
        </View>

        {/* Routine Steps List */}
        <View style={styles.stepsList}>
          {activeSteps.map(step => (
            <AppCard key={step.stepNumber} elevated style={styles.stepCard}>
              <View style={styles.stepHeader}>
                <View style={[styles.stepNumBadge, { backgroundColor: colors.primary }]}>
                  <AppText variant="body" color={colors.primaryForeground} style={styles.bold}>
                    {step.stepNumber}
                  </AppText>
                </View>
                <View style={styles.stepTitleContainer}>
                  <AppBadge label={step.category} variant="info" />
                  <AppText variant="h3">{step.productName}</AppText>
                </View>
              </View>

              <View style={[styles.heroIngBox, { backgroundColor: colors.secondary }]}>
                <AppText variant="caption" muted>
                  Key Active:
                </AppText>
                <AppText variant="body" color={colors.primary} style={styles.bold}>
                  {step.heroIngredient}
                </AppText>
              </View>

              <View style={styles.stepDetail}>
                <AppText variant="caption" muted>
                  Why this step is selected:
                </AppText>
                <AppText variant="body">{step.whyRecommended}</AppText>
              </View>

              <View style={styles.stepDetail}>
                <AppText variant="caption" muted>
                  Application Guide:
                </AppText>
                <AppText variant="body">{step.howToApply}</AppText>
              </View>

              {step.cautions ? (
                <View style={[styles.cautionBox, { backgroundColor: colors.warning + '15' }]}>
                  <AppText variant="caption" color={colors.warning} style={styles.bold}>
                    ⚠️ Caution: {step.cautions}
                  </AppText>
                </View>
              ) : null}
            </AppCard>
          ))}
        </View>

        {/* Recommended Ingredients Knowledge Base */}
        <AppCard elevated style={styles.ingredientSection}>
          <AppText variant="h2">Recommended Ingredients</AppText>
          <AppText variant="body" muted>
            Active compounds tailored to your skin observations:
          </AppText>

          <View style={styles.ingredientGrid}>
            {plan.recommendedIngredients.map(ing => (
              <View key={ing.id} style={[styles.ingredientItem, { borderColor: colors.border }]}>
                <View style={styles.ingItemHeader}>
                  <AppText variant="h3">{ing.name}</AppText>
                  <AppBadge label={ing.safeFrequency} variant="neutral" />
                </View>
                <AppText variant="caption" color={colors.primary} style={styles.bold}>
                  {ing.cosmeticRole}
                </AppText>
                <View style={styles.benefitsList}>
                  {ing.benefits.map((b, idx) => (
                    <AppText key={idx} variant="caption" muted>
                      • {b}
                    </AppText>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </AppCard>

        {/* Patch Test & Safety Guide */}
        <AppCard elevated style={styles.safetyCard}>
          <AppText variant="h3">🛡️ Safe Skincare Guidelines</AppText>
          <AppText variant="body" style={styles.safetyText}>
            {plan.patchTestGuide}
          </AppText>
          <View style={styles.cautionList}>
            {plan.cautionaryNotes.map((note, idx) => (
              <AppText key={idx} variant="caption" muted>
                • {note}
              </AppText>
            ))}
          </View>
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
  header: {
    gap: Spacing.xs,
  },
  kicker: {
    fontWeight: '700',
    letterSpacing: 1,
  },
  segmentedTrack: {
    flexDirection: 'row',
    borderRadius: Radii.md,
    padding: 4,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
    borderRadius: Radii.sm,
  },
  segmentActive: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  stepsList: {
    gap: Spacing.md,
  },
  stepCard: {
    gap: Spacing.sm,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  stepNumBadge: {
    width: 32,
    height: 32,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitleContainer: {
    flex: 1,
    gap: 4,
  },
  bold: {
    fontWeight: '600',
  },
  heroIngBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.sm,
  },
  stepDetail: {
    gap: 2,
  },
  cautionBox: {
    padding: Spacing.sm,
    borderRadius: Radii.sm,
  },
  ingredientSection: {
    gap: Spacing.md,
  },
  ingredientGrid: {
    gap: Spacing.md,
  },
  ingredientItem: {
    padding: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  ingItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  benefitsList: {
    marginTop: 4,
    gap: 2,
  },
  safetyCard: {
    gap: Spacing.sm,
    backgroundColor: '#FAF9F6',
  },
  safetyText: {
    fontSize: 13,
    lineHeight: 18,
  },
  cautionList: {
    gap: 4,
  },
});
