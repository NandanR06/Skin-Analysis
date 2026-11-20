import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/ui';
import { FaceScanLogo, ScanViewfinderIcon } from '@/components/ui/icons';
import { Spacing, Radii } from '@/constants/theme';

export function RoutineHeader() {
  return (
    <View style={styles.container}>
      {/* ── Brand Logo & Title ─────────────────────────────────── */}
      <View style={styles.brandRow}>
        <FaceScanLogo size={36} />
        <View style={styles.brandTextCol}>
          <AppText variant="h2" style={styles.brandTitle}>
            FaceScan AI
          </AppText>
          <AppText style={styles.routineLabel}>ROUTINE</AppText>
        </View>
      </View>

      {/* ── Right Actions: Scan Shortcut & Profile Avatar ─────── */}
      <View style={styles.actionsRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Launch Camera Scanner"
          onPress={() => router.push('/scan/camera')}
          style={({ pressed }) => [styles.scanBtn, pressed && { opacity: 0.85 }]}
        >
          <ScanViewfinderIcon size={20} color="#FFFFFF" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View Profile"
          onPress={() => router.push('/Profile')}
          style={({ pressed }) => [styles.avatarBtn, pressed && { opacity: 0.85 }]}
        >
          <View style={styles.avatarInner} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  brandTextCol: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B132B',
    lineHeight: 22,
    letterSpacing: -0.3,
  },
  routineLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.6,
    marginTop: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scanBtn: {
    width: 40,
    height: 40,
    borderRadius: Radii.pill,
    backgroundColor: '#0B132B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarBtn: {
    width: 40,
    height: 40,
    borderRadius: Radii.pill,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F5D0C5',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarInner: {
    width: 24,
    height: 24,
    borderRadius: Radii.pill,
    backgroundColor: '#D99B87',
  },
});
