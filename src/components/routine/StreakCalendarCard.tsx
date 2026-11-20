import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '@/components/ui';
import { FlameIcon, CheckIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';

interface DayItem {
  day: string;
  status: 'completed' | 'current' | 'future';
}

const DAYS: DayItem[] = [
  { day: 'M', status: 'completed' },
  { day: 'T', status: 'completed' },
  { day: 'W', status: 'completed' },
  { day: 'T', status: 'completed' },
  { day: 'F', status: 'current' },
  { day: 'S', status: 'future' },
  { day: 'S', status: 'future' },
];

export function StreakCalendarCard() {
  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Top Header Row ─────────────────────────────────────── */}
      <View style={styles.topRow}>
        <View style={styles.leftCol}>
          <View style={styles.flameIconBox}>
            <FlameIcon size={20} color="#D97706" />
          </View>

          <View style={styles.streakDetails}>
            <View style={styles.streakTitleRow}>
              <AppText style={styles.streakTitle}>5-Day Glow Streak</AppText>
              <View style={styles.topRankPill}>
                <AppText style={styles.topRankText}>Top 4%</AppText>
              </View>
            </View>
            <AppText style={styles.streakSubtext} numberOfLines={1}>
              Barrier resilience up +18% this week
            </AppText>
          </View>
        </View>

        <View style={styles.rightTargetCol}>
          <AppText style={styles.regimenTargetTitle}>AM Regimen</AppText>
          <AppText style={styles.regimenTargetSub}>Target: 4 steps</AppText>
        </View>
      </View>

      {/* ── Days of Week Tracker Row ───────────────────────────── */}
      <View style={styles.calendarRow}>
        {DAYS.map((item, idx) => (
          <View key={idx} style={styles.dayCol}>
            <AppText style={styles.dayLetter}>{item.day}</AppText>
            {item.status === 'completed' && (
              <View style={[styles.dayPill, styles.dayCompleted]}>
                <CheckIcon size={11} color="#4F46E5" />
              </View>
            )}
            {item.status === 'current' && (
              <View style={[styles.dayPill, styles.dayCurrent]}>
                <CheckIcon size={11} color="#FFFFFF" />
              </View>
            )}
            {item.status === 'future' && (
              <View style={[styles.dayPill, styles.dayFuture]}>
                <View style={styles.futureDot} />
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#F1EFEA',
    gap: 14,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  flameIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakDetails: {
    flex: 1,
    gap: 2,
  },
  streakTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  streakTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B132B',
  },
  topRankPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  topRankText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#D97706',
  },
  streakSubtext: {
    fontSize: 12,
    color: '#64748B',
  },
  rightTargetCol: {
    alignItems: 'flex-end',
    gap: 2,
  },
  regimenTargetTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B132B',
  },
  regimenTargetSub: {
    fontSize: 11,
    color: '#64748B',
  },
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  dayCol: {
    alignItems: 'center',
    gap: 6,
  },
  dayLetter: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  dayPill: {
    width: 38,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCompleted: {
    backgroundColor: '#EEF2FF',
  },
  dayCurrent: {
    backgroundColor: '#0B132B',
  },
  dayFuture: {
    backgroundColor: '#FAF7F0',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  futureDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#94A3B8',
  },
});
