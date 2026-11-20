import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { AppText } from '@/components/ui';
import { FaceScanLogo, ScanViewfinderIcon } from '@/components/ui/icons';
import { Spacing, Radii } from '@/constants/theme';

export function HomeHeader() {
  return (
    <View style={styles.container}>
      {/* ── Brand Logo & Title ─────────────────────────────────── */}
      <View style={styles.brandRow}>
        <FaceScanLogo size={36} />
        <View style={styles.brandTextCol}>
          <AppText variant="h2" style={styles.brandTitle}>
            FaceScan AI
          </AppText>
          <AppText style={styles.homeLabel}>HOME</AppText>
        </View>
      </View>

      {/* ── Right Actions: Scan Shortcut & Profile Avatar ─────── */}
      <View style={styles.actionsRow}>
        {/* Dark Navy Scanner Shortcut Button */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Launch Camera Scanner"
          onPress={() => router.push('/scan/camera')}
          style={({ pressed }) => [styles.scanBtn, pressed && { opacity: 0.85 }]}
        >
          <ScanViewfinderIcon size={20} color="#FFFFFF" />
        </Pressable>

        {/* Elena Profile Avatar */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View Profile"
          onPress={() => router.push('/Profile')}
          style={({ pressed }) => [styles.avatarBtn, pressed && { opacity: 0.85 }]}
        >
          <ElenaAvatar size={40} />
        </Pressable>
      </View>
    </View>
  );
}

// ─── Stylized Elena Profile Avatar ───────────────────────────────────────────
function ElenaAvatar({ size = 40 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Defs>
        <LinearGradient id="avatarBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#F5D0C5" />
          <Stop offset="100%" stopColor="#E0A997" />
        </LinearGradient>
        <LinearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#4A2E18" />
          <Stop offset="100%" stopColor="#2D1B0D" />
        </LinearGradient>
      </Defs>
      {/* Outer avatar border */}
      <Circle cx="20" cy="20" r="19" fill="url(#avatarBg)" stroke="#E5E7EB" strokeWidth="2" />

      {/* Hair back */}
      <Path
        d="M 10 24 C 10 12 13 8 20 8 C 27 8 30 12 30 24 C 30 28 28 34 26 36 C 24 33 24 28 24 25 C 24 23 20 23 20 23 C 20 23 16 23 16 25 C 16 28 16 33 14 36 C 12 34 10 28 10 24 Z"
        fill="url(#hairGrad)"
      />

      {/* Face oval */}
      <Path
        d="M 14 19 C 14 14 16.5 12 20 12 C 23.5 12 26 14 26 19 C 26 24 23 27 20 27 C 17 27 14 24 14 19 Z"
        fill="#FFDFD3"
      />

      {/* Hair front waves */}
      <Path
        d="M 13 16 C 16 11 19 12 20 15 C 21 12 24 11 27 16 C 27 14 25 10 20 10 C 15 10 13 14 13 16 Z"
        fill="url(#hairGrad)"
      />

      {/* Smile & Eyes */}
      <Circle cx="18" cy="18.5" r="1" fill="#4A2E18" />
      <Circle cx="22" cy="18.5" r="1" fill="#4A2E18" />
      <Path
        d="M 18.5 22.5 Q 20 24 21.5 22.5"
        stroke="#C26D5A"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />

      {/* Shirt */}
      <Path d="M 12 40 C 12 33 16 30 20 30 C 24 30 28 33 28 40 Z" fill="#4F46E5" opacity="0.85" />
    </Svg>
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
  homeLabel: {
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
    overflow: 'hidden',
  },
});
