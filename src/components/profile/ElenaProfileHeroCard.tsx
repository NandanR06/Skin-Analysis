import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { AppText } from '@/components/ui';
import { VerifiedBadgeIcon, TrendUpIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';

export function ElenaProfileHeroCard() {
  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Center Avatar with Glowing Violet Halo ─────────────── */}
      <View style={styles.avatarWrapper}>
        <Svg width={96} height={96} viewBox="0 0 96 96" style={StyleSheet.absoluteFill}>
          <Defs>
            <RadialGradient id="avatarGlow" cx="48" cy="48" r="48" gradientUnits="userSpaceOnUse">
              <Stop offset="70%" stopColor="#818CF8" stopOpacity="0.4" />
              <Stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
            </RadialGradient>
          </Defs>
          <Circle
            cx="48"
            cy="48"
            r="44"
            stroke="#818CF8"
            strokeWidth="2.5"
            fill="url(#avatarGlow)"
          />
        </Svg>

        <View style={styles.avatarMain}>
          <View style={styles.avatarInnerHair} />
        </View>

        {/* Status Dot */}
        <View style={styles.statusDot} />
      </View>

      {/* ── Name & Verified Badge ──────────────────────────────── */}
      <View style={styles.nameRow}>
        <AppText style={styles.userName}>Elena Rostova</AppText>
        <VerifiedBadgeIcon size={18} color="#4F46E5" />
      </View>

      {/* ── Derma-AI Tier 1 Badge ──────────────────────────────── */}
      <View style={styles.tierBadge}>
        <View style={styles.sparkleDot} />
        <AppText style={styles.tierText}>Derma-AI Tier 1 • Active Telemetry</AppText>
      </View>

      {/* ── 3 Quick Clinical Stats Columns ─────────────────────── */}
      <View style={styles.statsContainer}>
        {/* Stat 1: Scans Done */}
        <View style={styles.statCol}>
          <AppText style={styles.statValue}>42</AppText>
          <AppText style={styles.statLabel}>Scans Done</AppText>
        </View>

        <View style={styles.statDivider} />

        {/* Stat 2: Dermal Health */}
        <View style={styles.statCol}>
          <View style={styles.statScoreRow}>
            <AppText style={styles.statValue}>88</AppText>
            <TrendUpIcon size={12} color="#4F46E5" />
          </View>
          <AppText style={styles.statLabel}>Dermal Health</AppText>
        </View>

        <View style={styles.statDivider} />

        {/* Stat 3: Active Streak */}
        <View style={styles.statCol}>
          <AppText style={styles.statValue}>18d</AppText>
          <AppText style={styles.statLabel}>Active Streak</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAF8FF',
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    alignItems: 'center',
    gap: 8,
  },
  avatarWrapper: {
    position: 'relative',
    width: 96,
    height: 96,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  avatarMain: {
    width: 76,
    height: 76,
    borderRadius: Radii.pill,
    backgroundColor: '#F5D0C5',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarInnerHair: {
    width: 52,
    height: 52,
    borderRadius: Radii.pill,
    backgroundColor: '#4A2E18',
  },
  statusDot: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#6366F1',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: -0.4,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 5,
  },
  sparkleDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#4F46E5',
  },
  tierText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4F46E5',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.lg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0B132B',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
  },
});
