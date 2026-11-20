import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/ui';
import { ChevronLeftIcon, FaceScanLogo } from '@/components/ui/icons';
import { Spacing, Radii } from '@/constants/theme';

interface ScanHeaderProps {
  onBack?: () => void;
  title?: string;
}

export function ScanHeader({ onBack, title = 'Diagnostic Report' }: ScanHeaderProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.headerBar}>
      {/* Left Back Chevron Button */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Go back"
        onPress={handleBack}
        style={({ pressed }) => [styles.headerCircleBtn, pressed && { opacity: 0.8 }]}
      >
        <ChevronLeftIcon size={18} color="#0B132B" />
      </Pressable>

      {/* Brand Title with Logo */}
      <View style={styles.headerBrandCol}>
        <View style={styles.headerLogoRow}>
          <FaceScanLogo size={24} />
          <AppText style={styles.headerTitle} numberOfLines={1}>
            {title}
          </AppText>
        </View>
      </View>

      {/* Right User Avatar */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="View profile"
        onPress={() => router.push('/Profile')}
        style={styles.avatarCircle}
      >
        <View style={styles.avatarInner} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    backgroundColor: '#FAF8F5',
  },
  headerCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: Radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  headerBrandCol: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: Spacing.sm,
  },
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.3,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: Radii.pill,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    backgroundColor: '#F5D0C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: 24,
    height: 24,
    borderRadius: Radii.pill,
    backgroundColor: '#D99B87',
  },
});
