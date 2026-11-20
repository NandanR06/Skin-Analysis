import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppText } from '@/components/ui';
import { SparkleWandIcon, DocumentReportIcon } from '@/components/ui/icons';
import { Spacing, Radii, Colors } from '@/constants/theme';
import { ScanReport } from '@/types/scan';
import { ScanHeader } from './ScanHeader';
import { HealthIndexCard } from './HealthIndexCard';
import { ZonalBiometricMap } from './ZonalBiometricMap';
import { EpidermalBiomarkers } from './EpidermalBiomarkers';
import { DermatologistTakeawayCard } from './DermatologistTakeawayCard';

const C = Colors.light;

export interface ScanReportViewProps {
  report: ScanReport;
  onReturn?: () => void;
}

export function ScanReportView({ report, onReturn }: ScanReportViewProps) {
  const [exported, setExported] = useState(false);

  const handleExportPdf = () => {
    setExported(true);
    Alert.alert(
      'Clinical Report Exported',
      'Your FaceScan AI biometric diagnosis has been generated and saved as a high-resolution PDF document.',
      [{ text: 'Done', style: 'default' }],
    );
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      {/* ── Top Header Bar ─────────────────────────────────────── */}
      <ScanHeader onBack={onReturn} title="Diagnostic Report" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── 1. Skin Health Index Hero Card ───────────────────── */}
        <HealthIndexCard report={report} />

        {/* ── 2. Zonal Biometric Mapping Interactive HUD ───────── */}
        <ZonalBiometricMap />

        {/* ── 3. Epidermal Biomarkers (4 Parameters) ───────────── */}
        <EpidermalBiomarkers report={report} />

        {/* ── 4. AI Dermatologist Takeaway ─────────────────────── */}
        <DermatologistTakeawayCard report={report} />

        {/* ── 5. Bottom Action CTAs ────────────────────────────── */}
        <View style={styles.actionCol}>
          {/* Primary Navy Button: Update Routine */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Update Personalized Routine"
            onPress={() => router.push('/routine')}
            style={({ pressed }) => [
              styles.primaryCtaBtn,
              pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
            ]}
          >
            <SparkleWandIcon size={18} color="#FFFFFF" />
            <AppText style={styles.primaryCtaText}>Update Personalized Routine</AppText>
          </Pressable>

          {/* Secondary Outline Button: Export PDF */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Export Clinical PDF Report"
            onPress={handleExportPdf}
            style={({ pressed }) => [styles.secondaryCtaBtn, pressed && { opacity: 0.85 }]}
          >
            <DocumentReportIcon size={18} color="#0B132B" />
            <AppText style={styles.secondaryCtaText}>
              {exported ? '✓ Clinical PDF Ready' : 'Export Clinical PDF Report'}
            </AppText>
          </Pressable>
        </View>

        {/* ── Bottom Regulatory Disclaimer ─────────────────────── */}
        <View style={styles.disclaimerContainer}>
          <AppText style={styles.disclaimerText}>
            🛡️ Cosmetic wellness estimations only · Non-diagnostic · Does not treat medical skin
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
    gap: Spacing.lg - 4,
  },
  actionCol: {
    gap: 12,
    marginTop: Spacing.xs,
  },
  primaryCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B132B',
    height: 52,
    borderRadius: Radii.md,
    gap: 8,
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryCtaText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  secondaryCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  secondaryCtaText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B132B',
  },
  disclaimerContainer: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
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
