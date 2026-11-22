import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { AppText } from '@/components/ui';
import { ScanViewfinderIcon, BatteryIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';

export function DiagnosticHardwareCard() {
  const [autoSync, setAutoSync] = useState(true);

  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Top Header Row ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeftCol}>
          <View style={styles.sensorIconCircle}>
            <ScanViewfinderIcon size={18} color="#0B132B" />
          </View>
          <View style={styles.titleCol}>
            <AppText style={styles.sectionTitle}>Diagnostic Hardware</AppText>
            <AppText style={styles.sectionSubtitle}>Paired spectral sensors</AppText>
          </View>
        </View>

        <View style={styles.onlineBadge}>
          <View style={styles.onlineDot} />
          <AppText style={styles.onlineText}>Online</AppText>
        </View>
      </View>

      {/* ── Paired Sensor Subcard ──────────────────────────────── */}
      <View style={styles.sensorCard}>
        <View style={styles.reticleBox}>
          <ScanViewfinderIcon size={18} color="#0B132B" />
        </View>

        <View style={styles.sensorDetailsCol}>
          <AppText style={styles.sensorName}>TrueDepth Spectral Sensor</AppText>
          <AppText style={styles.sensorSpecs}>Lux calibrated • 94 CRI Verified</AppText>
        </View>

        <View style={styles.batteryPill}>
          <BatteryIcon size={14} color="#0B132B" />
          <AppText style={styles.batteryText}>94%</AppText>
        </View>
      </View>

      {/* ── Auto-Sync Toggle Row ───────────────────────────────── */}
      <View style={styles.syncSettingRow}>
        <View style={styles.syncTextCol}>
          <AppText style={styles.syncTitle}>Auto-Sync Clinical Scans</AppText>
          <AppText style={styles.syncSubtext}>Transmit directly to regimen matrix</AppText>
        </View>

        <Switch
          value={autoSync}
          onValueChange={setAutoSync}
          trackColor={{ false: '#E2E8F0', true: '#0B132B' }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xl,
    padding: Spacing.md + 2,
    borderWidth: 1,
    borderColor: '#F1EFEA',
    gap: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  sensorIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#FAF7F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  titleCol: {
    gap: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#64748B',
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    gap: 5,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4F46E5',
  },
  onlineText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#4F46E5',
  },
  sensorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.md,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  reticleBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sensorDetailsCol: {
    flex: 1,
    gap: 2,
  },
  sensorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B132B',
  },
  sensorSpecs: {
    fontSize: 11,
    color: '#64748B',
  },
  batteryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  batteryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0B132B',
  },
  syncSettingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1EFEA',
    paddingTop: 10,
  },
  syncTextCol: {
    gap: 2,
    flex: 1,
  },
  syncTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0B132B',
  },
  syncSubtext: {
    fontSize: 11,
    color: '#64748B',
  },
});
