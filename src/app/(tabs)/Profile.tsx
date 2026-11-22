import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '@/constants/theme';
import { useProfileStore } from '@/store/useProfileStore';
import {
  ProfileTopHeader,
  ElenaProfileHeroCard,
  BiologicalSkinProfileCard,
  DiagnosticHardwareCard,
  ScanArchiveProgressCard,
  DermatologicalCareTeamCard,
  PreferencesSecurityCard,
} from '@/components/profile';

export default function ProfileScreen() {
  const { profile } = useProfileStore();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* ── Fixed Top Header Bar ──────────────────────────────── */}
      <ProfileTopHeader />

      {/* ── Scrollable Clinical Profile Body ──────────────────── */}
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 1. Hero Card: Avatar + Tier 1 Badge + 3 Stat Columns */}
        <ElenaProfileHeroCard />

        {/* 2. Biological Skin Profile: Phototype, Metrics, Baseline Targets */}
        <BiologicalSkinProfileCard profile={profile} />

        {/* 3. Diagnostic Hardware: TrueDepth Sensor + Auto-Sync Toggle */}
        <DiagnosticHardwareCard />

        {/* 4. Scan Archive & Progress: Telemetry Delta Comparison */}
        <ScanArchiveProgressCard />

        {/* 5. Dermatological Care Team: Dr. Sarah Vance + Export Dossier */}
        <DermatologicalCareTeamCard />

        {/* 6. Preferences & Security: Encrypted storage, Integrations, Sign Out */}
        <PreferencesSecurityCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  scroll: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: 110,
    gap: Spacing.md,
  },
});
