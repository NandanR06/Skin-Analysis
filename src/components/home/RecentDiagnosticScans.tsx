import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/ui';
import { Spacing, Radii, Shadow } from '@/constants/theme';
import { BiometricFaceVisual } from './BiometricFaceVisual';
import { ScanReport } from '@/types/scan';

interface RecentDiagnosticScansProps {
  scanHistory?: ScanReport[];
}

export function RecentDiagnosticScans({ scanHistory = [] }: RecentDiagnosticScansProps) {
  const logCount = Math.max(scanHistory.length, 3);

  return (
    <View style={styles.section}>
      {/* ── Section Header ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.titleBadgeRow}>
          <AppText variant="h2" style={styles.title}>
            Recent Diagnostic Scans
          </AppText>
          <View style={styles.logsBadge}>
            <AppText style={styles.logsText}>{logCount} Logs</AppText>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View scan history"
          onPress={() => router.push('/Profile')}
          hitSlop={8}
        >
          <AppText style={styles.historyText}>History</AppText>
        </Pressable>
      </View>

      {/* ── 2 Scan Preview Cards Row ───────────────────────────── */}
      <View style={styles.cardsRow}>
        {/* Scan 1: Yesterday, 88 score, Full Spectrum */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View Yesterday Full Spectrum scan report"
          onPress={() => router.push('/scan/results')}
          style={({ pressed }) => [styles.scanCard, Shadow.sm, pressed && { opacity: 0.92 }]}
        >
          <View style={styles.thumbWrapper}>
            <BiometricFaceVisual
              height={110}
              variant="thumbnail"
              score={88}
              scanType="Full Spectrum"
            />
          </View>
          <View style={styles.cardFooter}>
            <AppText style={styles.timeText}>Yesterday</AppText>
            <AppText style={styles.ptsText}>+2 pts</AppText>
          </View>
        </Pressable>

        {/* Scan 2: 3 days ago, 86 score, Quick Scan */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View 3 days ago Quick Scan report"
          onPress={() => router.push('/scan/results')}
          style={({ pressed }) => [styles.scanCard, Shadow.sm, pressed && { opacity: 0.92 }]}
        >
          <View style={styles.thumbWrapper}>
            <BiometricFaceVisual
              height={110}
              variant="thumbnail"
              score={86}
              scanType="Quick Scan"
            />
          </View>
          <View style={styles.cardFooter}>
            <AppText style={styles.timeText}>3 days ago</AppText>
            <AppText style={styles.ptsText}>+1 pt</AppText>
          </View>
        </Pressable>
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
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.3,
  },
  logsBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  logsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  historyText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#4F46E5',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  scanCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  thumbWrapper: {
    width: '100%',
    height: 110,
    backgroundColor: '#070F1D',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  timeText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  ptsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
});
