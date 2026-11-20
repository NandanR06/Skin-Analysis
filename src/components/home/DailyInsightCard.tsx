import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { AppText } from '@/components/ui';
import { SunIcon, ClockIcon, CheckIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';

export function DailyInsightCard() {
  const [dismissed, setDismissed] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);

  if (dismissed) return null;

  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Top Header Row ─────────────────────────────────────── */}
      <View style={styles.topRow}>
        <View style={styles.badgeRow}>
          <View style={styles.sunCircle}>
            <SunIcon size={16} color="#7C3AED" />
          </View>
          <AppText style={styles.tagText}>DAILY INSIGHT • UV ALERT</AppText>
        </View>
        <AppText style={styles.todayText}>Today</AppText>
      </View>

      {/* ── Message Content ────────────────────────────────────── */}
      <AppText style={styles.messageText}>
        UV index is 7 <AppText style={styles.boldText}>(Very High)</AppText> today. Don&apos;t
        forget your SPF 50 reapplication at 2:00 PM.
      </AppText>

      {/* ── Bottom Action Links Row ────────────────────────────── */}
      <View style={styles.actionRow}>
        {reminderSet ? (
          <View style={styles.reminderConfirm}>
            <CheckIcon size={14} color="#10B981" />
            <AppText style={styles.reminderConfirmText}>Reminder set for 2:00 PM</AppText>
          </View>
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Set 2 PM SPF reminder"
            onPress={() => setReminderSet(true)}
            hitSlop={6}
            style={styles.reminderBtn}
          >
            <ClockIcon size={14} color="#0B132B" />
            <AppText style={styles.reminderBtnText}>Set 2 PM Reminder</AppText>
          </Pressable>
        )}

        <AppText style={styles.dotSeparator}>•</AppText>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Dismiss UV alert"
          onPress={() => setDismissed(true)}
          hitSlop={8}
        >
          <AppText style={styles.dismissText}>Dismiss</AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAF5FF',
    borderRadius: Radii.xl,
    padding: Spacing.md + 2,
    borderWidth: 1,
    borderColor: '#EDE9FE',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sunCircle: {
    width: 28,
    height: 28,
    borderRadius: Radii.pill,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 0.8,
  },
  todayText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  messageText: {
    fontSize: 13.5,
    color: '#1E293B',
    lineHeight: 20,
    marginTop: 10,
  },
  boldText: {
    fontWeight: '700',
    color: '#0B132B',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  reminderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  reminderBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0B132B',
  },
  reminderConfirm: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reminderConfirmText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#10B981',
  },
  dotSeparator: {
    color: '#94A3B8',
    fontSize: 14,
  },
  dismissText: {
    fontSize: 13,
    color: '#64748B',
  },
});
