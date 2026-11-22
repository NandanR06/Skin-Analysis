import React from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { AppText } from '@/components/ui';
import {
  BellIcon,
  LockShieldIcon,
  HeartIcon,
  ShieldCheckIcon,
  ChevronRightIcon,
  LogOutIcon,
} from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';
import { useProfileStore } from '@/store/useProfileStore';
import { useScanStore } from '@/store/useScanStore';

export function PreferencesSecurityCard() {
  const { resetProfile } = useProfileStore();
  const { clearAllScanHistory } = useScanStore();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out of Clinical Account?',
      'You are about to sign out of this clinical profile. All on-device encrypted telemetry will remain secured locally.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await clearAllScanHistory();
            await resetProfile();
          },
        },
      ],
    );
  };

  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Top Header Row ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <LockShieldIcon size={18} color="#7C3AED" />
        </View>
        <View style={styles.titleCol}>
          <AppText style={styles.sectionTitle}>Preferences & Security</AppText>
          <AppText style={styles.sectionSubtitle}>Data privacy and synchronization</AppText>
        </View>
      </View>

      {/* ── 4 Preference Rows ──────────────────────────────────── */}
      <View style={styles.itemsCol}>
        {/* Item 1: Reminders & SPF Prompts */}
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert('Reminders & SPF Prompts', 'Configured: 2:00 PM SPF • 8:00 PM Regimen')
          }
          style={({ pressed }) => [styles.prefItem, pressed && { opacity: 0.85 }]}
        >
          <View style={styles.itemIconCircle}>
            <BellIcon size={16} color="#4F46E5" />
          </View>
          <View style={styles.itemTextCol}>
            <AppText style={styles.itemTitle}>Reminders & SPF Prompts</AppText>
            <AppText style={styles.itemSubtext}>2:00 PM SPF • 8:00 PM Regimen</AppText>
          </View>
          <ChevronRightIcon size={14} color="#94A3B8" />
        </Pressable>

        {/* Item 2: Biometric Neural Encryption */}
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert(
              'Neural Encryption',
              'On-device cryptographic key verifies all telemetry scans.',
            )
          }
          style={({ pressed }) => [styles.prefItem, pressed && { opacity: 0.85 }]}
        >
          <View style={styles.itemIconCircle}>
            <LockShieldIcon size={16} color="#4F46E5" />
          </View>
          <View style={styles.itemTextCol}>
            <AppText style={styles.itemTitle}>Biometric Neural Encryption</AppText>
            <AppText style={styles.itemSubtext}>On-Device processing • Zero cloud storage</AppText>
          </View>
          <View style={styles.activePill}>
            <AppText style={styles.activePillText}>Active</AppText>
          </View>
        </Pressable>

        {/* Item 3: Apple Health & Sleep Sync */}
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert('Health Sync', 'Apple Health hydration & circadian rhythm sync enabled.')
          }
          style={({ pressed }) => [styles.prefItem, pressed && { opacity: 0.85 }]}
        >
          <View style={styles.itemIconCircle}>
            <HeartIcon size={16} color="#DC2626" />
          </View>
          <View style={styles.itemTextCol}>
            <AppText style={styles.itemTitle}>Apple Health & Sleep Sync</AppText>
            <AppText style={styles.itemSubtext}>Sync hydration, UV index & sleep cycle</AppText>
          </View>
          <ChevronRightIcon size={14} color="#94A3B8" />
        </Pressable>

        {/* Item 4: Clinical Consents & Ethics */}
        <Pressable
          accessibilityRole="button"
          onPress={() =>
            Alert.alert('Ethics & Consents', 'Institutional Review Board protocol 22-A approved.')
          }
          style={({ pressed }) => [styles.prefItem, pressed && { opacity: 0.85 }]}
        >
          <View style={styles.itemIconCircle}>
            <ShieldCheckIcon size={16} color="#4F46E5" />
          </View>
          <View style={styles.itemTextCol}>
            <AppText style={styles.itemTitle}>Clinical Consents & Ethics</AppText>
            <AppText style={styles.itemSubtext}>Institutional Review Board protocol 22-A</AppText>
          </View>
          <ChevronRightIcon size={14} color="#94A3B8" />
        </Pressable>
      </View>

      {/* ── Sign Out Button ────────────────────────────────────── */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Sign Out of Clinical Account"
        onPress={handleSignOut}
        style={({ pressed }) => [styles.signOutBtn, pressed && { opacity: 0.8 }]}
      >
        <LogOutIcon size={16} color="#DC2626" />
        <AppText style={styles.signOutText}>Sign Out of Clinical Account</AppText>
      </Pressable>

      {/* ── Version Footer ─────────────────────────────────────── */}
      <AppText style={styles.versionText}>Derma-AI Precision v4.19.2 (Build 8904)</AppText>
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
    alignItems: 'center',
    gap: 10,
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
  itemsCol: {
    gap: 8,
  },
  prefItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.md,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  itemTextCol: {
    flex: 1,
    gap: 2,
  },
  itemTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0B132B',
  },
  itemSubtext: {
    fontSize: 11,
    color: '#64748B',
  },
  activePill: {
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  activePillText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#4F46E5',
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    marginTop: 2,
  },
  signOutText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
  },
  versionText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: -4,
  },
});
