import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  HomeHeader,
  TelemetryHeroCard,
  StartScanCard,
  BiometricTelemetryGrid,
  DailyInsightCard,
  DailyRegimenTracker,
  RecentDiagnosticScans,
} from '@/components/home';
import { AppText } from '@/components/ui';
import { Colors, Spacing } from '@/constants/theme';
import { useProfileStore } from '@/store/useProfileStore';
import { useScanStore } from '@/store/useScanStore';

const C = Colors.light;

export default function HomeScreen() {
  const { currentReport, scanHistory, loadScanHistory } = useScanStore();
  const { loadProfile } = useProfileStore();

  useEffect(() => {
    loadScanHistory();
    loadProfile();
  }, [loadScanHistory, loadProfile]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Top Bar Header (Logo + Scan + Avatar) ────────────── */}
        <HomeHeader />

        {/* ── Welcome & Telemetry Card (Score Ring 88) ──────────── */}
        <TelemetryHeroCard report={currentReport} userName="Elena" calibratedHoursAgo={18} />

        {/* ── Start New Face Scan Hero Card (AI Scanner) ────────── */}
        <StartScanCard />

        {/* ── Biometric Telemetry (2x2 Grid) ────────────────────── */}
        <BiometricTelemetryGrid report={currentReport} />

        {/* ── Daily Insight • UV Alert Card ─────────────────────── */}
        <DailyInsightCard />

        {/* ── Daily Regimen Tracker (Morning / Evening) ─────────── */}
        <DailyRegimenTracker />

        {/* ── Recent Diagnostic Scans (History / Logs) ─────────── */}
        <RecentDiagnosticScans scanHistory={scanHistory} />

        {/* ── Bottom Clinical / Cosmetic Disclaimer ─────────────── */}
        <View style={styles.disclaimerContainer}>
          <AppText style={styles.disclaimerText}>
            Cosmetic wellness estimations only · Non-diagnostic · Does not treat medical skin
            conditions
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.background,
  },
  scroll: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.xl + 20,
    gap: Spacing.md,
  },
  disclaimerContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  disclaimerText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 16,
  },
});
