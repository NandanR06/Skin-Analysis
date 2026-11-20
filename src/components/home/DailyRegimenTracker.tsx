import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/ui';
import { SunIcon, MoonIcon, CheckIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';

export function DailyRegimenTracker() {
  return (
    <View style={styles.section}>
      {/* ── Section Header ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <AppText variant="h2" style={styles.title}>
          Daily Regimen Tracker
        </AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View full routine"
          onPress={() => router.push('/routine')}
          hitSlop={8}
        >
          <AppText style={styles.viewRoutineText}>View Routine</AppText>
        </Pressable>
      </View>

      {/* ── 2 Cards Row ────────────────────────────────────────── */}
      <View style={styles.cardsRow}>
        {/* Morning Card */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Morning Routine - Completed"
          onPress={() => router.push('/routine')}
          style={({ pressed }) => [styles.regimenCard, Shadow.sm, pressed && { opacity: 0.92 }]}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#FDF2F8' }]}>
            <SunIcon size={18} color="#9333EA" />
          </View>
          <View style={styles.textCol}>
            <AppText style={styles.routineTitle}>Morning</AppText>
            <View style={styles.statusRow}>
              <CheckIcon size={12} color="#10B981" />
              <AppText style={styles.completedText}>Completed</AppText>
            </View>
          </View>
        </Pressable>

        {/* Evening Card */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Evening Routine - Pending"
          onPress={() => router.push('/routine')}
          style={({ pressed }) => [styles.regimenCard, Shadow.sm, pressed && { opacity: 0.92 }]}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#EEF2FF' }]}>
            <MoonIcon size={18} color="#4F46E5" />
          </View>
          <View style={styles.textCol}>
            <AppText style={styles.routineTitle}>Evening</AppText>
            <View style={styles.statusRow}>
              <View style={styles.pendingDot} />
              <AppText style={styles.pendingText}>Pending</AppText>
            </View>
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.3,
  },
  viewRoutineText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#4F46E5',
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  regimenCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1EFEA',
    gap: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: {
    gap: 3,
  },
  routineTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B132B',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  completedText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  pendingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
  },
  pendingText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
