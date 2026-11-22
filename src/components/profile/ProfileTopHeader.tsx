import React from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { AppText } from '@/components/ui';
import { EditPencilIcon, SettingsGearIcon } from '@/components/ui/icons';
import { Spacing, Radii } from '@/constants/theme';

export function ProfileTopHeader() {
  const handleEdit = () => {
    Alert.alert('Edit Clinical Profile', 'You can update your personal diagnostics profile.');
  };

  const handleSettings = () => {
    Alert.alert('Diagnostic Preferences', 'Hardware and telemetry sync configurations.');
  };

  return (
    <View style={styles.headerBar}>
      {/* Left Avatar & Title */}
      <View style={styles.leftCol}>
        <View style={styles.avatarCircle}>
          <View style={styles.avatarInner} />
        </View>

        <View style={styles.titleCol}>
          <AppText style={styles.titleText}>Profile & Clinical Account</AppText>
          <AppText style={styles.subText}>Clinical Account & Diagnostics</AppText>
        </View>
      </View>

      {/* Right Icons: Edit Pencil + Settings Gear */}
      <View style={styles.rightIconsRow}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Edit Profile"
          onPress={handleEdit}
          style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.8 }]}
        >
          <EditPencilIcon size={17} color="#0B132B" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Settings"
          onPress={handleSettings}
          style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.8 }]}
        >
          <SettingsGearIcon size={17} color="#0B132B" />
        </Pressable>
      </View>
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
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  avatarCircle: {
    width: 38,
    height: 38,
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
  titleCol: {
    gap: 2,
  },
  titleText: {
    fontSize: 16.5,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.3,
  },
  subText: {
    fontSize: 11,
    color: '#64748B',
  },
  rightIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
