import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui';
import { ClinicBadgeIcon, LightbulbIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';
import { ScanReport } from '@/types/scan';

interface DermatologistTakeawayCardProps {
  report?: ScanReport | null;
}

export function DermatologistTakeawayCard({ report }: DermatologistTakeawayCardProps) {
  const primaryObservation = report?.summaryObservations?.primaryFocus
    ? report.summaryObservations.primaryFocus.replace(/_/g, ' ')
    : 'Slight dehydration detected';

  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Header Row ─────────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeftCol}>
          <ClinicBadgeIcon size={20} color="#FFFFFF" />
          <View style={styles.titleCol}>
            <AppText style={styles.titleText}>AI Dermatologist Takeaway</AppText>
            <AppText style={styles.modelSubtext}>Clinical Synthesis Model v4.2</AppText>
          </View>
        </View>

        <View style={styles.confidencePill}>
          <AppText style={styles.confidenceText}>99.4% Confidence</AppText>
        </View>
      </View>

      {/* ── Inner White Observation Box ────────────────────────── */}
      <View style={styles.innerBox}>
        {/* Highlighted Clinical Finding */}
        <View style={styles.findingRow}>
          <AppText style={styles.findingText}>
            <AppText style={styles.highlightText}>{primaryObservation}</AppText> in the peri-orbital
            area (Zone D). Cellular elasticity remains top-decile across cheekbones.
          </AppText>
        </View>

        {/* Actionable Medical Recommendation */}
        <View style={styles.recommendationBox}>
          <View style={styles.lightbulbCircle}>
            <LightbulbIcon size={15} color="#4F46E5" />
          </View>
          <AppText style={styles.recommendationText}>
            <AppText style={styles.recommendationBold}>Recommendation: </AppText>
            Infuse low-molecular Hyaluronic Acid serum boost nightly.
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAF7FD',
    borderRadius: Radii.xl,
    padding: Spacing.md + 2,
    borderWidth: 1,
    borderColor: '#EDE9FE',
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
  titleCol: {
    gap: 2,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B132B',
  },
  modelSubtext: {
    fontSize: 11,
    color: '#64748B',
  },
  confidencePill: {
    backgroundColor: '#FAF7F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  confidenceText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  innerBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.md + 2,
    padding: 14,
    marginTop: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  findingRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  findingText: {
    fontSize: 13,
    color: '#1E293B',
    lineHeight: 19,
  },
  highlightText: {
    backgroundColor: '#EDE9FE',
    color: '#4F46E5',
    fontWeight: '700',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  recommendationBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  lightbulbCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  recommendationText: {
    fontSize: 12.5,
    color: '#0B132B',
    lineHeight: 18,
    flex: 1,
  },
  recommendationBold: {
    fontWeight: '700',
    color: '#0B132B',
  },
});
