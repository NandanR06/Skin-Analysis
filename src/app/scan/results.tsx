import React from 'react';
import { useScanStore } from '@/store/useScanStore';
import { getPresetReport } from '@/features/analysis/sampleScans';
import { ScanReportView } from '@/components/scan';

export default function ResultsScreen() {
  const { currentReport } = useScanStore();
  const report = currentReport ?? getPresetReport('preset_balanced');

  return <ScanReportView report={report} />;
}
