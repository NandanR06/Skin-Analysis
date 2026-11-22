import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import Svg, { Rect, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import { AppText } from '@/components/ui';
import { ChevronRightIcon, ScanViewfinderIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';

export function ScanArchiveProgressCard() {
  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Top Header Row ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeftCol}>
          <View style={styles.archiveIconCircle}>
            <ScanViewfinderIcon size={18} color="#7C3AED" />
          </View>
          <View style={styles.titleCol}>
            <AppText style={styles.sectionTitle}>Scan Archive & Progress</AppText>
            <AppText style={styles.sectionSubtitle}>Telemetry comparison timeline</AppText>
          </View>
        </View>

        <AppText style={styles.scansCountBadge}>42 Scans</AppText>
      </View>

      {/* ── Telemetry Delta Comparison Subcard ─────────────────── */}
      <View style={styles.deltaCard}>
        {/* Header Row: Telemetry Delta + Overall Gain */}
        <View style={styles.deltaHeaderRow}>
          <AppText style={styles.deltaTitle}>TELEMETRY DELTA</AppText>
          <View style={styles.gainPill}>
            <AppText style={styles.gainText}>+4.2% Overall Gain</AppText>
          </View>
        </View>

        {/* 2 Comparison Thumbnails Side by Side */}
        <View style={styles.thumbsRow}>
          {/* Baseline Thumbnail */}
          <View style={styles.thumbCol}>
            <View style={styles.thumbImageWrapper}>
              <ComparisonPortraitGraphic tone="neutral" />
              <View style={styles.thumbOverlayTag}>
                <AppText style={styles.thumbOverlayText}>Sep 12 Baseline</AppText>
              </View>
            </View>
            <View style={styles.scoreRow}>
              <AppText style={styles.scoreLabel}>Dermal Score</AppText>
              <AppText style={styles.scoreNumber}>84</AppText>
            </View>
          </View>

          {/* Today Thumbnail */}
          <View style={styles.thumbCol}>
            <View style={styles.thumbImageWrapper}>
              <ComparisonPortraitGraphic tone="radiant" />
              <View style={styles.thumbOverlayTag}>
                <AppText style={styles.thumbOverlayText}>Today, 10:42 AM</AppText>
              </View>
            </View>
            <View style={styles.scoreRow}>
              <AppText style={styles.scoreLabel}>Dermal Score</AppText>
              <AppText style={styles.scoreNumber}>88</AppText>
            </View>
          </View>
        </View>

        {/* Progress Metrics Text */}
        <AppText style={styles.progressMetricsText}>
          Moisture retention: <AppText style={styles.boldText}>+7%</AppText> Erythema reduction:{' '}
          <AppText style={styles.boldText}>-12%</AppText>
        </AppText>
      </View>

      {/* ── View Complete Scan Archive Button ──────────────────── */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="View Complete Scan Archive"
        onPress={() => router.push('/scan/results')}
        style={({ pressed }) => [styles.viewArchiveBtn, pressed && { opacity: 0.85 }]}
      >
        <AppText style={styles.viewArchiveBtnText}>View Complete Scan Archive (42)</AppText>
        <ChevronRightIcon size={14} color="#0B132B" />
      </Pressable>
    </View>
  );
}

// ─── Comparison Portrait Graphic ─────────────────────────────────────────────
function ComparisonPortraitGraphic({ tone }: { tone: 'neutral' | 'radiant' }) {
  const isRadiant = tone === 'radiant';
  return (
    <Svg width="100%" height={90} viewBox="0 0 130 90">
      <Defs>
        <LinearGradient
          id={`portGrad_${tone}`}
          x1="0"
          y1="0"
          x2="0"
          y2="90"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0%" stopColor={isRadiant ? '#D4BBA5' : '#C5B5A5'} />
          <Stop offset="100%" stopColor={isRadiant ? '#8F7B6B' : '#7D6F63'} />
        </LinearGradient>
      </Defs>
      <Rect width="130" height="90" fill={`url(#portGrad_${tone})`} />
      <Circle cx="65" cy="45" r="28" fill="#F6D7C2" />
      <Circle cx="56" cy="42" r="3" fill="#4A3324" />
      <Circle cx="74" cy="42" r="3" fill="#4A3324" />
      <Circle cx="65" cy="54" r="5" fill="#CB8378" opacity="0.6" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xl,
    padding: Spacing.md + 2,
    borderWidth: 1,
    borderColor: '#F1EFEA',
    gap: 12,
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
  archiveIconCircle: {
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
  scansCountBadge: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#64748B',
  },
  deltaCard: {
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.md,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  deltaHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deltaTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 0.6,
  },
  gainPill: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  gainText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#4F46E5',
  },
  thumbsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  thumbCol: {
    flex: 1,
    gap: 6,
  },
  thumbImageWrapper: {
    position: 'relative',
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#070F1D',
  },
  thumbOverlayTag: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  thumbOverlayText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#0B132B',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  scoreLabel: {
    fontSize: 11,
    color: '#64748B',
  },
  scoreNumber: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B132B',
  },
  progressMetricsText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 2,
  },
  boldText: {
    fontWeight: '700',
    color: '#0B132B',
  },
  viewArchiveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF7F0',
    height: 42,
    borderRadius: Radii.md,
    gap: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  viewArchiveBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0B132B',
  },
});
