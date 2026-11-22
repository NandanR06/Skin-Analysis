import React from 'react';
import { View, StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useScanStore } from '@/store/useScanStore';
import { getPresetReport } from '@/features/analysis/sampleScans';
import { ClinicalDossierModal } from '@/components/report';

export default function StandaloneReportScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { currentReport, scanHistory } = useScanStore();

  const report =
    (id ? scanHistory.find(s => s.scanId === id) : null) ??
    (id?.startsWith('preset_') ? getPresetReport(id) : null) ??
    currentReport ??
    getPresetReport('preset_balanced');

  return (
    <View style={styles.container}>
      <ClinicalDossierModal visible={true} onClose={() => router.back()} report={report} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B132B',
  },
});
