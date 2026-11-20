import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useScanStore } from '@/store/useScanStore';
import { getPresetReport } from '@/features/analysis/sampleScans';
import { ScanReportView } from '@/components/scan';
import { AppText, AppButton } from '@/components/ui';
import { Spacing, Colors } from '@/constants/theme';

const C = Colors.light;

export default function DynamicScanScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { scanHistory, currentReport } = useScanStore();

  // Find scan by ID in history, sample presets, or fallback to currentReport
  const report =
    scanHistory.find(s => s.scanId === id) ??
    (id?.startsWith('preset_') ? getPresetReport(id) : null) ??
    (currentReport?.scanId === id ? currentReport : null);

  if (!report) {
    return (
      <View style={styles.notFoundContainer}>
        <AppText style={{ fontSize: 40 }}>🔍</AppText>
        <AppText variant="h2" style={{ marginTop: Spacing.md }}>
          Scan Not Found
        </AppText>
        <AppText variant="body" color={C.textMuted} style={styles.notFoundText}>
          The requested scan record (#{id}) could not be located in your local history.
        </AppText>
        <AppButton
          title="Return to Dashboard"
          onPress={() => router.replace('/(tabs)')}
          variant="primary"
          size="md"
          style={{ marginTop: Spacing.lg }}
        />
      </View>
    );
  }

  return <ScanReportView report={report} onReturn={() => router.back()} />;
}

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    backgroundColor: C.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  notFoundText: {
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});
