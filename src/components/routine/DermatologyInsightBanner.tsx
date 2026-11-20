import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui';
import { CpuChipIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';

export function DermatologyInsightBanner() {
  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Top Header ─────────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <CpuChipIcon size={16} color="#7C3AED" />
        </View>
        <AppText style={styles.titleText}>Dermatology AI Insight</AppText>
      </View>

      {/* ── Body Message ───────────────────────────────────────── */}
      <AppText style={styles.bodyText}>
        Your skin barrier is thriving under the amino cleanser routine. Don&apos;t skip SPF 50
        today—outdoor UV index spikes at 1:30 PM in your zone.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#F1EFEA',
    gap: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B132B',
  },
  bodyText: {
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 18,
  },
});
