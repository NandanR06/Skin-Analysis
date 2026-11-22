import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { AppText } from '@/components/ui';
import {
  StethoscopeIcon,
  ChatBubbleIcon,
  DocumentReportIcon,
  DownloadIcon,
} from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';
import { useScanStore } from '@/store/useScanStore';
import { ClinicalDossierModal } from '@/components/report';

export function DermatologicalCareTeamCard() {
  const [showDossier, setShowDossier] = useState(false);
  const { currentReport } = useScanStore();

  const handleChatDoctor = () => {
    Alert.alert(
      'Care Team Message',
      'Direct messaging channel with Dr. Sarah Vance, MD is active under your clinical plan.',
      [
        { text: 'Open Chat', style: 'default' },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const handleExportDossier = () => {
    setShowDossier(true);
  };

  return (
    <View style={[styles.card, Shadow.sm]}>
      {/* ── Top Header Row ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.iconCircle}>
          <StethoscopeIcon size={18} color="#7C3AED" />
        </View>
        <View style={styles.titleCol}>
          <AppText style={styles.sectionTitle}>Dermatological Care Team</AppText>
          <AppText style={styles.sectionSubtitle}>Direct medical review & verification</AppText>
        </View>
      </View>

      {/* ── Doctor Card ────────────────────────────────────────── */}
      <View style={styles.doctorCard}>
        <View style={styles.doctorAvatar}>
          <View style={styles.doctorLabCoat} />
        </View>

        <View style={styles.doctorDetailsCol}>
          <AppText style={styles.doctorName}>Dr. Sarah Vance, MD</AppText>
          <AppText style={styles.doctorSpecialty}>Clinical Dermatology & Phototherapy</AppText>
          <AppText style={styles.doctorReview}>Next Review: Nov 14, 2024</AppText>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Message doctor"
          onPress={handleChatDoctor}
          style={({ pressed }) => [styles.chatBtn, pressed && { opacity: 0.8 }]}
        >
          <ChatBubbleIcon size={16} color="#0B132B" />
        </Pressable>
      </View>

      {/* ── Export Full Medical Dossier Button ──────────────────── */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Export Full Medical Dossier"
        onPress={handleExportDossier}
        style={({ pressed }) => [styles.exportBtn, pressed && { opacity: 0.9 }]}
      >
        <DocumentReportIcon size={18} color="#FFFFFF" />
        <View style={styles.exportBtnCenterText}>
          <AppText style={styles.exportBtnTitle}>Export Full Medical Dossier</AppText>
          <AppText style={styles.exportBtnSub}>HIPAA Certified PDF • 14 Pages</AppText>
        </View>
        <DownloadIcon size={16} color="#FFFFFF" />
      </Pressable>

      {/* ── Full Clinical Dossier Modal ──────────────────────── */}
      <ClinicalDossierModal
        visible={showDossier}
        onClose={() => setShowDossier(false)}
        report={currentReport}
      />
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
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
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
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.md,
    padding: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  doctorAvatar: {
    width: 44,
    height: 44,
    borderRadius: Radii.pill,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  doctorLabCoat: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0B132B',
  },
  doctorDetailsCol: {
    flex: 1,
    gap: 2,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0B132B',
  },
  doctorSpecialty: {
    fontSize: 11,
    color: '#64748B',
  },
  doctorReview: {
    fontSize: 10.5,
    color: '#4F46E5',
    fontWeight: '600',
    marginTop: 1,
  },
  chatBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.pill,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0B132B',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: Radii.md,
  },
  exportBtnCenterText: {
    alignItems: 'center',
    gap: 2,
  },
  exportBtnTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  exportBtnSub: {
    fontSize: 10.5,
    color: '#94A3B8',
  },
});
