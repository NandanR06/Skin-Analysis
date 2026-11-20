import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText, AppButton, AppCard, AppBadge } from '@/components/ui';
import { Spacing, Radii, Colors, Shadow } from '@/constants/theme';
import { useScanStore } from '@/store/useScanStore';
import { useProfileStore } from '@/store/useProfileStore';
import { buildPersonalizedPlan } from '@/features/recommendations/routineBuilder';
import { getPresetReport } from '@/features/analysis/sampleScans';

const C = Colors.light;

export default function RoutineScreen() {
  const { currentReport } = useScanStore();
  const { profile } = useProfileStore();
  const [activeTab, setActiveTab] = useState<'AM' | 'PM'>('AM');

  const effectiveReport = currentReport ?? getPresetReport('preset_balanced');
  const plan = buildPersonalizedPlan(effectiveReport, profile);
  const activeSteps = activeTab === 'AM' ? plan.morningRoutine : plan.eveningRoutine;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Header ───────────────────────────────── */}
        <View style={styles.header}>
          <AppText variant="overline" color={C.textMuted}>
            TARGETED REGIMEN
          </AppText>
          <AppText variant="h1" style={{ marginTop: 2 }}>
            Daily Routine
          </AppText>
          <AppText variant="body" color={C.textSecondary} style={{ marginTop: 4 }}>
            {plan.summary}
          </AppText>
        </View>

        {/* ── AM / PM Toggle ───────────────────────── */}
        <View style={styles.toggle}>
          <Pressable
            onPress={() => setActiveTab('AM')}
            style={[styles.toggleBtn, activeTab === 'AM' && styles.toggleActive]}
          >
            <AppText variant="h3" color={activeTab === 'AM' ? C.primary : C.textMuted}>
              ☀️ Morning
            </AppText>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('PM')}
            style={[styles.toggleBtn, activeTab === 'PM' && styles.toggleActive]}
          >
            <AppText variant="h3" color={activeTab === 'PM' ? C.primary : C.textMuted}>
              🌙 Evening
            </AppText>
          </Pressable>
        </View>

        {/* ── Routine Steps ─────────────────────────── */}
        <View style={styles.stepList}>
          {activeSteps.map((step, idx) => (
            <View key={step.stepNumber} style={styles.stepRow}>
              {/* timeline line */}
              {idx < activeSteps.length - 1 && <View style={styles.timeline} />}

              {/* step number bubble */}
              <View style={[styles.stepNumBubble, { backgroundColor: C.primary }]}>
                <AppText variant="caption" color="#FFFFFF" style={{ fontWeight: '800' }}>
                  {step.stepNumber}
                </AppText>
              </View>

              {/* step content */}
              <AppCard elevated style={styles.stepCard}>
                <View style={styles.stepCardHeader}>
                  <View style={{ flex: 1 }}>
                    <AppBadge label={step.category} variant="info" />
                    <AppText variant="h3" style={{ marginTop: 6 }}>
                      {step.productName}
                    </AppText>
                  </View>
                </View>

                {/* Key ingredient highlight */}
                <View style={styles.ingBox}>
                  <AppText variant="caption" color={C.textMuted}>
                    KEY ACTIVE
                  </AppText>
                  <AppText variant="body" color={C.primary} style={{ fontWeight: '700' }}>
                    {step.heroIngredient}
                  </AppText>
                </View>

                <View style={styles.infoBlock}>
                  <AppText variant="caption" color={C.textMuted} style={styles.infoLabel}>
                    Why selected
                  </AppText>
                  <AppText variant="body">{step.whyRecommended}</AppText>
                </View>

                <View style={styles.infoBlock}>
                  <AppText variant="caption" color={C.textMuted} style={styles.infoLabel}>
                    How to apply
                  </AppText>
                  <AppText variant="body">{step.howToApply}</AppText>
                </View>

                {step.cautions ? (
                  <View style={styles.cautionBox}>
                    <AppText variant="caption" color={C.warning} style={{ fontWeight: '700' }}>
                      ⚠️ {step.cautions}
                    </AppText>
                  </View>
                ) : null}
              </AppCard>
            </View>
          ))}
        </View>

        {/* ── Recommended Ingredients ───────────────── */}
        <View style={styles.sectionHeader}>
          <AppText variant="h2">Recommended Ingredients</AppText>
          <AppText variant="body" color={C.textMuted} style={{ marginTop: 4 }}>
            Active compounds tailored to your skin observations
          </AppText>
        </View>

        <View style={styles.ingGrid}>
          {plan.recommendedIngredients.map(ing => (
            <AppCard key={ing.id} style={styles.ingCard}>
              <View style={styles.ingHeader}>
                <AppText variant="h3">{ing.name}</AppText>
                <AppBadge label={ing.safeFrequency} variant="neutral" />
              </View>
              <AppText
                variant="caption"
                color={C.primary}
                style={{ fontWeight: '600', marginTop: 2 }}
              >
                {ing.cosmeticRole}
              </AppText>
              <View style={{ marginTop: Spacing.xs, gap: 2 }}>
                {ing.benefits.map((b, idx) => (
                  <AppText key={idx} variant="caption" color={C.textSecondary}>
                    · {b}
                  </AppText>
                ))}
              </View>
            </AppCard>
          ))}
        </View>

        {/* ── Safety Card ───────────────────────────── */}
        <AppCard tinted style={styles.safetyCard}>
          <AppText variant="h3">🛡️ Safe Skincare Guidelines</AppText>
          <AppText
            variant="body"
            color={C.textSecondary}
            style={{ marginTop: Spacing.sm, lineHeight: 20 }}
          >
            {plan.patchTestGuide}
          </AppText>
          <View style={{ marginTop: Spacing.sm, gap: 4 }}>
            {plan.cautionaryNotes.map((note, idx) => (
              <AppText key={idx} variant="caption" color={C.textSecondary}>
                · {note}
              </AppText>
            ))}
          </View>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.background },
  scroll: { padding: Spacing.lg, gap: Spacing.lg, paddingBottom: Spacing['2xl'] },

  header: { gap: 0 },

  // Toggle
  toggle: {
    flexDirection: 'row',
    backgroundColor: C.secondary,
    borderRadius: Radii.lg,
    padding: 4,
    gap: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
    borderRadius: Radii.md,
  },
  toggleActive: {
    backgroundColor: '#FFFFFF',
    ...Shadow.sm,
  },

  // Steps
  stepList: { gap: 0 },
  stepRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    position: 'relative',
  },
  timeline: {
    position: 'absolute',
    left: 15,
    top: 36,
    bottom: -Spacing.md,
    width: 2,
    backgroundColor: C.border,
    zIndex: 0,
  },
  stepNumBubble: {
    width: 32,
    height: 32,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.md,
    flexShrink: 0,
    zIndex: 1,
  },
  stepCard: { flex: 1, gap: Spacing.sm, padding: Spacing.md },
  stepCardHeader: { flexDirection: 'row', alignItems: 'flex-start' },
  ingBox: {
    backgroundColor: C.secondary,
    borderRadius: Radii.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBlock: { gap: 2 },
  infoLabel: { fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  cautionBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: Radii.sm,
    padding: Spacing.sm,
  },

  // Ingredients
  sectionHeader: { gap: 0 },
  ingGrid: { gap: Spacing.sm },
  ingCard: { gap: 0 },
  ingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Safety
  safetyCard: { gap: 0 },
});
