import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/ui';
import { SettingsGearIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';
import { SkinProfile } from '@/types/profile';

interface BiologicalSkinProfileCardProps {
  profile?: SkinProfile | null;
}

export function BiologicalSkinProfileCard({ profile }: BiologicalSkinProfileCardProps) {
  const skinTypeLabel =
    profile?.skinFeel && profile.skinFeel !== 'not_sure'
      ? profile.skinFeel.replace(/_/g, ' ')
      : 'Combination';

  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Top Header Row ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeftCol}>
          <View style={styles.iconCircle}>
            <SettingsGearIcon size={18} color="#7C3AED" />
          </View>
          <View style={styles.titleCol}>
            <AppText style={styles.sectionTitle}>Biological Skin Profile</AppText>
            <AppText style={styles.sectionSubtitle}>Multi-spectral matrix telemetry</AppText>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Recalibrate profile questionnaire"
          onPress={() => router.push('/questionnaire')}
          style={({ pressed }) => [styles.recalibrateBtn, pressed && { opacity: 0.85 }]}
        >
          <AppText style={styles.recalibrateBtnText}>⟲ Recalibrate</AppText>
        </Pressable>
      </View>

      {/* ── 2 Diagnostic Profile Sub-Boxes ─────────────────────── */}
      <View style={styles.boxesRow}>
        {/* Box 1: Primary Skin Type */}
        <View style={styles.diagnosticBox}>
          <AppText style={styles.boxOverline}>Primary Skin Type</AppText>
          <AppText style={styles.boxTitle}>{skinTypeLabel}</AppText>
          <AppText style={styles.boxSubtext}>Sensitive Lipid Barrier</AppText>
        </View>

        {/* Box 2: Fitzpatrick Phototype */}
        <View style={styles.diagnosticBox}>
          <AppText style={styles.boxOverline}>Fitzpatrick Phototype</AppText>
          <View style={styles.phototypeRow}>
            <AppText style={styles.boxTitle}>Type II</AppText>
            <View style={styles.phototypeDot} />
          </View>
          <AppText style={styles.boxSubtext}>Fair / High Sensibility</AppText>
        </View>
      </View>

      {/* ── 2 Progress Indicators ──────────────────────────────── */}
      <View style={styles.progressCol}>
        {/* 1. Barrier Integrity & Lipids */}
        <View style={styles.metricItem}>
          <View style={styles.metricHeaderRow}>
            <AppText style={styles.metricLabel}>Barrier Integrity & Lipids</AppText>
            <AppText style={styles.metricVal}>91% (Optimal)</AppText>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: '91%', backgroundColor: '#0B132B' }]} />
          </View>
        </View>

        {/* 2. Hydration Equilibrium */}
        <View style={styles.metricItem}>
          <View style={styles.metricHeaderRow}>
            <AppText style={styles.metricLabel}>Hydration Equilibrium</AppText>
            <AppText style={styles.metricVal}>84% (Balanced)</AppText>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: '84%', backgroundColor: '#4F46E5' }]} />
          </View>
        </View>
      </View>

      {/* ── Identified Baseline Targets Chips ──────────────────── */}
      <View style={styles.targetsCol}>
        <AppText style={styles.targetsLabel}>Identified Baseline Targets</AppText>
        <View style={styles.chipsRow}>
          <View style={styles.targetChip}>
            <AppText style={styles.targetChipText}>Peri-orbital fatigue</AppText>
          </View>
          <View style={styles.targetChip}>
            <AppText style={styles.targetChipText}>Seasonal moisture depletion</AppText>
          </View>
          <View style={styles.targetChip}>
            <AppText style={styles.targetChipText}>T-zone sebum shift</AppText>
          </View>
        </View>
      </View>

      {/* ── Calibration Footer ─────────────────────────────────── */}
      <View style={styles.footerRow}>
        <AppText style={styles.footerTimeText}>◷ Calibrated Today, 10:12 AM</AppText>
        <AppText style={styles.footerAiText}>Spectral AI 4.2</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xl,
    padding: Spacing.md + 2,
    borderWidth: 1,
    borderColor: '#F1EFEA',
    gap: 14,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCol: {
    gap: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  recalibrateBtn: {
    backgroundColor: '#FAF7F0',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.pill,
  },
  recalibrateBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0B132B',
  },
  boxesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  diagnosticBox: {
    flex: 1,
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.md,
    padding: 12,
    gap: 2,
  },
  boxOverline: {
    fontSize: 10.5,
    color: '#64748B',
  },
  boxTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#0B132B',
    textTransform: 'capitalize',
  },
  boxSubtext: {
    fontSize: 11,
    color: '#64748B',
  },
  phototypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  phototypeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FDE4D0',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  progressCol: {
    gap: 10,
  },
  metricItem: {
    gap: 4,
  },
  metricHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#0B132B',
    fontWeight: '500',
  },
  metricVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B132B',
  },
  track: {
    width: '100%',
    height: 5,
    borderRadius: Radii.pill,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radii.pill,
  },
  targetsCol: {
    gap: 6,
  },
  targetsLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  targetChip: {
    backgroundColor: '#FAF7F0',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  targetChipText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1EFEA',
    paddingTop: 10,
    marginTop: 2,
  },
  footerTimeText: {
    fontSize: 11,
    color: '#64748B',
  },
  footerAiText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
});
