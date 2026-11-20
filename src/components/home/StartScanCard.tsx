import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/ui';
import { ApertureIcon, ScanViewfinderIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';
import { BiometricFaceVisual } from './BiometricFaceVisual';

export function StartScanCard() {
  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Top Futuristic Biometric Face Scanner View ───────────── */}
      <BiometricFaceVisual height={190} variant="hero" />

      {/* ── Bottom Content & CTA ───────────────────────────────── */}
      <View style={styles.content}>
        {/* Spectral AI Badge */}
        <View style={styles.spectralBadge}>
          <ApertureIcon size={13} color="#7C3AED" />
          <AppText style={styles.spectralText}>Spectral AI 4.2</AppText>
        </View>

        {/* Title & Description */}
        <AppText variant="h2" style={styles.title}>
          Start New Face Scan
        </AppText>
        <AppText style={styles.desc}>
          Real-time multispectral scan detects pore congestion, epidermal hydration, and lipid
          balance.
        </AppText>

        {/* Navy Launch Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Launch AI Scanner"
          onPress={() => router.push('/scan/camera')}
          style={({ pressed }) => [
            styles.launchBtn,
            pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          ]}
        >
          <ScanViewfinderIcon size={18} color="#FFFFFF" />
          <AppText style={styles.launchBtnText}>Launch AI Scanner</AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1EFEA',
  },
  content: {
    padding: Spacing.lg - 4,
  },
  spectralBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 5,
  },
  spectralText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#0B132B',
    marginTop: 10,
    letterSpacing: -0.3,
  },
  desc: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
    marginTop: 4,
  },
  launchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B132B',
    height: 50,
    borderRadius: Radii.md,
    marginTop: Spacing.md,
    gap: 8,
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  launchBtnText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
