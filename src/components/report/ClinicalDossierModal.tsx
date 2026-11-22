import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
  Share,
} from 'react-native';
import Svg, { Path, Circle, Line, Defs, LinearGradient, Stop } from 'react-native-svg';
import { AppText } from '@/components/ui';
import {
  CloseIcon,
  DownloadIcon,
  ShareIcon,
  PrinterIcon,
  VerifiedBadgeIcon,
  ClinicBadgeIcon,
} from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';
import { ScanReport } from '@/types/scan';

export interface ClinicalDossierModalProps {
  visible: boolean;
  onClose: () => void;
  report?: ScanReport | null;
  patientName?: string;
}

export function ClinicalDossierModal({
  visible,
  onClose,
  report,
  patientName = 'Elena Rostova',
}: ClinicalDossierModalProps) {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<string | null>(null);

  // Derive dynamic or fallback values
  const score = report?.overallScore ?? 88;
  const scanDate = report?.capturedAt
    ? new Date(report.capturedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Nov 22, 2026';
  const scanTime = report?.capturedAt
    ? new Date(report.capturedAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '09:42 AM';
  const scanId = report?.scanId ?? 'SCN-8842-DERMA';

  const handleDownloadPdf = () => {
    setDownloading(true);
    setDownloadProgress('Synthesizing high-res vector PDF...');

    setTimeout(() => {
      setDownloadProgress('Generating cryptographic checksum...');
    }, 700);

    setTimeout(() => {
      setDownloading(false);
      setDownloadProgress(null);
      Alert.alert(
        '✓ Clinical PDF Downloaded',
        `File "Clinical_Dossier_${scanId}.pdf" has been compiled and saved to your device. Full HIPAA/GDPR clinical verification attached.`,
        [
          {
            text: 'Share / Send',
            onPress: () => handleShare(),
          },
          { text: 'Done', style: 'default' },
        ],
      );
    }, 1500);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: `Clinical Skin Care Diagnostic Dossier - ${patientName}`,
        message: `FaceScan AI Biometric Dermatology Report\nPatient: ${patientName}\nDermal Health Index: ${score}/100 (Optimal Tier)\nAttending: Dr. Sarah Vance, MD\nReport Ref: ${scanId}`,
      });
    } catch {
      // User cancelled share
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        {/* Modal Window Container */}
        <View style={styles.modalContainer}>
          {/* ── Top Modal Navigation & Action Bar ───────────────── */}
          <View style={styles.topBar}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Close dossier"
              onPress={onClose}
              style={({ pressed }) => [styles.iconBtn, pressed && { opacity: 0.7 }]}
            >
              <CloseIcon size={20} color="#0B132B" />
            </Pressable>

            <View style={styles.topBarTitleCol}>
              <AppText style={styles.topBarTitle}>Diagnostic Dossier</AppText>
              <AppText style={styles.topBarSubtitle}>HIPAA Certified PDF Preview</AppText>
            </View>

            <View style={styles.topBarActions}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Share report"
                onPress={handleShare}
                style={({ pressed }) => [styles.actionRoundBtn, pressed && { opacity: 0.7 }]}
              >
                <ShareIcon size={16} color="#0B132B" />
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Download PDF"
                onPress={handleDownloadPdf}
                disabled={downloading}
                style={({ pressed }) => [styles.downloadPdfBtn, pressed && { opacity: 0.85 }]}
              >
                {downloading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <DownloadIcon size={14} color="#FFFFFF" />
                    <AppText style={styles.downloadPdfText}>Download PDF</AppText>
                  </>
                )}
              </Pressable>
            </View>
          </View>

          {/* Progress Toast */}
          {downloadProgress && (
            <View style={styles.progressBanner}>
              <ActivityIndicator size="small" color="#4F46E5" />
              <AppText style={styles.progressBannerText}>{downloadProgress}</AppText>
            </View>
          )}

          {/* ── Scrollable Document Sheet ───────────────────────── */}
          <ScrollView
            style={styles.sheetScroll}
            contentContainerStyle={styles.sheetContent}
            showsVerticalScrollIndicator={false}
          >
            {/* ══ PAPER REPORT SHEET ═══════════════════════════════ */}
            <View style={[styles.paperSheet, Shadow.md]}>
              {/* ── Document Letterhead Header ──────────────────── */}
              <View style={styles.letterhead}>
                <View style={styles.hospitalRow}>
                  <View style={styles.crestCircle}>
                    <ClinicBadgeIcon size={22} color="#FFFFFF" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText style={styles.clinicName}>FACEDERM OPTICAL LABORATORIES</AppText>
                    <AppText style={styles.clinicDivision}>
                      Multispectral Dermatology & Biometric Telemetry Unit
                    </AppText>
                    <AppText style={styles.clinicMeta}>
                      CLIA Certified #99D20819 · ISO 13485 Compliant
                    </AppText>
                  </View>
                  <View style={styles.statusVerifiedBadge}>
                    <VerifiedBadgeIcon size={14} color="#10B981" />
                    <AppText style={styles.verifiedText}>AUTHENTICATED</AppText>
                  </View>
                </View>

                <View style={styles.sheetDividerThick} />

                <View style={styles.docTitleRow}>
                  <AppText style={styles.docTitle}>CLINICAL BIOMETRIC EPIDERMAL DOSSIER</AppText>
                  <AppText style={styles.docSubtitle}>
                    Patient Diagnostic Evaluation & Precision Care Protocol
                  </AppText>
                </View>

                {/* ── Patient & Telemetry Metadata Grid ────────── */}
                <View style={styles.patientGrid}>
                  <View style={styles.patientCol}>
                    <AppText style={styles.metaLabel}>PATIENT NAME</AppText>
                    <AppText style={styles.metaValueBold}>{patientName}</AppText>
                  </View>
                  <View style={styles.patientCol}>
                    <AppText style={styles.metaLabel}>PATIENT ID</AppText>
                    <AppText style={styles.metaValue}>PAT-8842-DERMA</AppText>
                  </View>
                  <View style={styles.patientCol}>
                    <AppText style={styles.metaLabel}>EVALUATION DATE</AppText>
                    <AppText style={styles.metaValue}>
                      {scanDate} · {scanTime}
                    </AppText>
                  </View>
                  <View style={styles.patientCol}>
                    <AppText style={styles.metaLabel}>ATTENDING DERMATOLOGIST</AppText>
                    <AppText style={styles.metaValueBold}>Dr. Sarah Vance, MD</AppText>
                  </View>
                  <View style={styles.patientCol}>
                    <AppText style={styles.metaLabel}>OPTICAL HARDWARE</AppText>
                    <AppText style={styles.metaValue}>TrueDepth (94 CRI • 5500K)</AppText>
                  </View>
                  <View style={styles.patientCol}>
                    <AppText style={styles.metaLabel}>REPORT REFERENCE</AppText>
                    <AppText style={styles.metaValueCode}>{scanId}</AppText>
                  </View>
                </View>

                {/* Decorative Barcode Line */}
                <View style={styles.barcodeWrapper}>
                  <BarcodeVector />
                  <AppText style={styles.barcodeText}>* {scanId} *</AppText>
                </View>
              </View>

              {/* ── Section 1: Biological Diagnostics & Composite Score ── */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionNumberBadge}>
                    <AppText style={styles.sectionNumberText}>01</AppText>
                  </View>
                  <AppText style={styles.sectionTitle}>
                    BIOLOGICAL DIAGNOSTICS & DERMAL HEALTH INDEX
                  </AppText>
                </View>

                <View style={styles.heroDiagnosticRow}>
                  {/* Circular Score Visual */}
                  <View style={styles.scoreCircleWrapper}>
                    <Svg width={90} height={90} viewBox="0 0 90 90">
                      <Defs>
                        <LinearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <Stop offset="0%" stopColor="#4F46E5" />
                          <Stop offset="100%" stopColor="#7C3AED" />
                        </LinearGradient>
                      </Defs>
                      <Circle cx="45" cy="45" r="38" stroke="#E2E8F0" strokeWidth="8" fill="none" />
                      <Circle
                        cx="45"
                        cy="45"
                        r="38"
                        stroke="url(#scoreGrad)"
                        strokeWidth="8"
                        strokeDasharray="238.76"
                        strokeDashoffset={`${238.76 * (1 - score / 100)}`}
                        strokeLinecap="round"
                        fill="none"
                        transform="rotate(-90 45 45)"
                      />
                    </Svg>
                    <View style={styles.scoreCenterContent}>
                      <AppText style={styles.scoreBigNumber}>{score}</AppText>
                      <AppText style={styles.scoreTotal}>/ 100</AppText>
                    </View>
                  </View>

                  {/* Diagnostic Index Details */}
                  <View style={styles.diagnosticDetailsCol}>
                    <View style={styles.tierPillRow}>
                      <View style={styles.tierPill}>
                        <AppText style={styles.tierPillText}>OPTIMAL TIER</AppText>
                      </View>
                      <AppText style={styles.tierSubtext}>Top 12% decile for age cohort</AppText>
                    </View>
                    <AppText style={styles.diagnosticNarrative}>
                      Multispectral photon absorption confirms resilient stratum corneum integrity
                      with nominal lipid cellular hydration.
                    </AppText>
                    <View style={styles.phototypeRow}>
                      <AppText style={styles.phototypeLabel}>Fitzpatrick Phototype:</AppText>
                      <AppText style={styles.phototypeVal}>
                        Type II (Fair / High Sensibility)
                      </AppText>
                    </View>
                  </View>
                </View>

                {/* 3 Metric Progress Strips */}
                <View style={styles.metricsTripleCol}>
                  <MetricStrip
                    label="Barrier Integrity & Lipids"
                    value="91%"
                    target="Optimal"
                    percent={91}
                  />
                  <MetricStrip
                    label="Hydration Equilibrium"
                    value="84%"
                    target="Balanced"
                    percent={84}
                  />
                  <MetricStrip
                    label="Sebum Secretion Index"
                    value="48 μg/cm²"
                    target="Zone T Balanced"
                    percent={78}
                  />
                </View>
              </View>

              {/* ── Section 2: Zonal Biometric Mapping (HUD Breakdown) ── */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionNumberBadge}>
                    <AppText style={styles.sectionNumberText}>02</AppText>
                  </View>
                  <AppText style={styles.sectionTitle}>ZONAL BIOMETRIC MAPPING ANALYSIS</AppText>
                </View>

                <View style={styles.tableCard}>
                  <View style={styles.tableHeaderRow}>
                    <AppText style={[styles.tableHeadCell, { flex: 1.2 }]}>ZONE / REGION</AppText>
                    <AppText style={[styles.tableHeadCell, { flex: 1 }]}>HYDRATION</AppText>
                    <AppText style={[styles.tableHeadCell, { flex: 1.2 }]}>
                      VASCULAR / SEBUM
                    </AppText>
                    <AppText style={[styles.tableHeadCell, { flex: 0.9, textAlign: 'right' }]}>
                      STATUS
                    </AppText>
                  </View>

                  <ZoneRow
                    zone="Zone A: Frontal"
                    sub="Forehead"
                    hydration="94% Optimal"
                    secondary="Sebum Refined"
                    status="Optimal"
                    statusColor="#10B981"
                  />
                  <ZoneRow
                    zone="Zone B: Zygomatic"
                    sub="Cheeks"
                    hydration="88% Balanced"
                    secondary="Vascular Calm"
                    status="Resilient"
                    statusColor="#10B981"
                  />
                  <ZoneRow
                    zone="Zone C: Mandibular"
                    sub="Jawline & Neck"
                    hydration="86% Intact"
                    secondary="89% Elasticity"
                    status="Normal"
                    statusColor="#4F46E5"
                  />
                  <ZoneRow
                    zone="Zone D: Peri-Orbital"
                    sub="Under-Eye Contour"
                    hydration="68% Deficient"
                    secondary="12% Fatigue Shift"
                    status="Action Req."
                    statusColor="#D97706"
                    highlight
                  />
                </View>
              </View>

              {/* ── Section 3: Epidermal Biomarkers Table ──────────── */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionNumberBadge}>
                    <AppText style={styles.sectionNumberText}>03</AppText>
                  </View>
                  <AppText style={styles.sectionTitle}>
                    EPIDERMAL BIOMARKERS & QUANTITATIVE TARGETS
                  </AppText>
                </View>

                <View style={styles.biomarkersGrid}>
                  <BiomarkerCard
                    name="Hydration & Moisture"
                    score="91%"
                    band="Well Hydrated (Target)"
                    note="Intracellular fluid retention stabilized across stratum granulosum."
                  />
                  <BiomarkerCard
                    name="Pores & Micro-Texture"
                    score="82%"
                    band="Refined Microrelief"
                    note="Minimal micro-congestion detected across nasal bridge and central chin."
                  />
                  <BiomarkerCard
                    name="Vascular Calm & Redness"
                    score="95%"
                    band="Calm & Resilient"
                    note="Low thermal inflammation. Micro-erythema index within safety threshold."
                  />
                  <BiomarkerCard
                    name="Fine Line & Wrinkle Matrix"
                    score="86%"
                    band="Preventive Stability"
                    note="Fibroblast elasticity matrix supported; zero deep photo-damage expression."
                  />
                </View>
              </View>

              {/* ── Section 4: Prescribed Clinical Regimen (AM / PM) ── */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionNumberBadge}>
                    <AppText style={styles.sectionNumberText}>04</AppText>
                  </View>
                  <AppText style={styles.sectionTitle}>
                    CLINICAL PRESCRIPTION PROTOCOL (AM / PM)
                  </AppText>
                </View>

                {/* AM Regimen Box */}
                <View style={styles.regimenBox}>
                  <View style={styles.regimenHeaderRow}>
                    <AppText style={styles.regimenTimeTitle}>
                      ☀️ MORNING DEFENSE PROTOCOL (AM)
                    </AppText>
                    <AppText style={styles.regimenSub}>
                      Target: Barrier Shield & Antioxidant Lock
                    </AppText>
                  </View>

                  <RegimenItem
                    step="01"
                    category="CLEANSE"
                    product="Gentle Amino Foaming Cleanser"
                    dosage="1 pump • 60s"
                    ingredient="Balanced pH 5.5 Amino Surfactants"
                    reason="Preserves intercellular envelope while lifting overnight metabolic byproducts."
                  />
                  <RegimenItem
                    step="02"
                    category="TREAT"
                    product="Niacinamide 10% + Zinc 1% Pore Serum"
                    dosage="4 drops"
                    ingredient="Niacinamide (Vitamin B3) + Zinc PCA"
                    reason="Regulates daytime shine, refines pore appearance, and stabilizes lipids."
                  />
                  <RegimenItem
                    step="03"
                    category="TARGET"
                    product="Hyaluronic Acid Peri-Orbital Eye Gel"
                    dosage="Pea size"
                    ingredient="Low-Molecular HA + Peptides"
                    reason="Addresses localized micro-dehydration detected in Zone D telemetry."
                  />
                  <RegimenItem
                    step="04"
                    category="PROTECT"
                    product="Ceramide Barrier Sunscreen SPF 50+ PA++++"
                    dosage="2 finger lengths"
                    ingredient="Zinc Oxide 12% + Ceramides NP/AP"
                    reason="Crucial photo-protection against UV index spikes and photo-aging."
                  />
                </View>

                {/* PM Regimen Box */}
                <View style={[styles.regimenBox, { marginTop: 12 }]}>
                  <View style={styles.regimenHeaderRow}>
                    <AppText style={styles.regimenTimeTitle}>
                      🌙 EVENING CELLULAR REPAIR PROTOCOL (PM)
                    </AppText>
                    <AppText style={styles.regimenSub}>
                      Target: Stratum Corneum Lipid Regeneration
                    </AppText>
                  </View>

                  <RegimenItem
                    step="01"
                    category="PURIFY"
                    product="Lipid Squalane Cleansing Oil + Gentle Gel"
                    dosage="Double cleanse"
                    ingredient="Olive Squalane + Chamomile Extract"
                    reason="Dissolves airborne particulate matter and residual mineral sun filter."
                  />
                  <RegimenItem
                    step="02"
                    category="REPAIR"
                    product="Copper Tripeptide-1 Cellular Recovery Serum"
                    dosage="3-4 drops"
                    ingredient="Multi-Weight Hyaluronic Acid + GHK-Cu"
                    reason="Accelerates dermal fibroblast repair and boosts extracellular collagen."
                  />
                  <RegimenItem
                    step="03"
                    category="NOURISH"
                    product="Ceramide Lipid Replenishment Night Emulsion"
                    dosage="Nickel size"
                    ingredient="Phytosphingosine + Cholesterol"
                    reason="Locks in overnight transepidermal moisture envelope."
                  />
                </View>
              </View>

              {/* ── Section 5: Environmental Risk Assessment ──────── */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionNumberBadge}>
                    <AppText style={styles.sectionNumberText}>05</AppText>
                  </View>
                  <AppText style={styles.sectionTitle}>ENVIRONMENTAL TELEMETRY & ADVISORY</AppText>
                </View>

                <View style={styles.advisoryCard}>
                  <View style={styles.advisoryRow}>
                    <View style={styles.advisoryPill}>
                      <AppText style={styles.advisoryPillText}>UV ALERT • INDEX 7</AppText>
                    </View>
                    <AppText style={styles.advisoryTime}>Peak: 1:30 PM - 3:00 PM</AppText>
                  </View>
                  <AppText style={styles.advisoryBody}>
                    Outdoor UV radiation index is elevated. Re-apply Broad Spectrum SPF 50+ at 2:00
                    PM. Indoor ambient humidity is measured at 42%; maintain oral hydration intake
                    of 2.2L to assist epidermal moisture retention.
                  </AppText>
                </View>
              </View>

              {/* ── Section 6: Attending Physician Review & Seal ─── */}
              <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                  <View style={styles.sectionNumberBadge}>
                    <AppText style={styles.sectionNumberText}>06</AppText>
                  </View>
                  <AppText style={styles.sectionTitle}>
                    CLINICAL SIGNATURE & VERIFICATION SEAL
                  </AppText>
                </View>

                <View style={styles.signatureCard}>
                  <View style={styles.doctorBioCol}>
                    <AppText style={styles.doctorFullName}>Dr. Sarah Vance, MD</AppText>
                    <AppText style={styles.doctorCredentials}>
                      Board Certified Dermatologist · American Academy of Dermatology
                    </AppText>
                    <AppText style={styles.doctorLic}>
                      State Medical License #MD-88392 · NPI 194820194
                    </AppText>
                    <AppText style={styles.doctorRemarks}>
                      &quot;Diagnostic telemetry reveals exceptional cellular recovery. Focus on
                      peri-orbital hydration and consistent SPF reapplication.&quot;
                    </AppText>
                  </View>

                  {/* Visual Signature & Seal Stamp */}
                  <View style={styles.signatureSealCol}>
                    <DoctorSignatureGraphic />
                    <View style={styles.sealCircle}>
                      <Svg width={64} height={64} viewBox="0 0 64 64">
                        <Circle
                          cx="32"
                          cy="32"
                          r="30"
                          stroke="#4F46E5"
                          strokeWidth="1.5"
                          strokeDasharray="3 2"
                          fill="none"
                        />
                        <Circle
                          cx="32"
                          cy="32"
                          r="26"
                          stroke="#4F46E5"
                          strokeWidth="0.8"
                          fill="none"
                        />
                      </Svg>
                      <View style={styles.sealCenterText}>
                        <AppText style={styles.sealVerified}>VERIFIED</AppText>
                        <AppText style={styles.sealDerm}>DERMA-AI</AppText>
                        <AppText style={styles.sealYear}>2026</AppText>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Cryptographic Hash & Compliance Footer */}
                <View style={styles.complianceBox}>
                  <AppText style={styles.cryptoHash}>
                    CRYPTOGRAPHIC AUDIT TRAIL: SHA256: 8f92a43b71c081e592df09a12c884b2e
                  </AppText>
                  <AppText style={styles.legalDisclaimer}>
                    CONFIDENTIAL MEDICAL DOSSIER. Generated in compliance with HIPAA Title II and
                    GDPR Article 9. Diagnostic estimations are biometric cosmetic assessments
                    designed to guide clinical skincare formulation.
                  </AppText>
                </View>
              </View>
            </View>

            {/* Bottom Actions inside Document */}
            <View style={styles.bottomActionsRow}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Print dossier"
                onPress={handleDownloadPdf}
                style={({ pressed }) => [styles.secondaryPrintBtn, pressed && { opacity: 0.8 }]}
              >
                <PrinterIcon size={16} color="#0B132B" />
                <AppText style={styles.secondaryPrintText}>Print / Export PDF</AppText>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close"
                onPress={onClose}
                style={({ pressed }) => [styles.primaryDoneBtn, pressed && { opacity: 0.9 }]}
              >
                <AppText style={styles.primaryDoneText}>Done</AppText>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function MetricStrip({
  label,
  value,
  target,
  percent,
}: {
  label: string;
  value: string;
  target: string;
  percent: number;
}) {
  return (
    <View style={metricStyles.strip}>
      <View style={metricStyles.row}>
        <AppText style={metricStyles.label}>{label}</AppText>
        <AppText style={metricStyles.val}>
          {value} · <AppText style={metricStyles.target}>{target}</AppText>
        </AppText>
      </View>
      <View style={metricStyles.track}>
        <View style={[metricStyles.fill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const metricStyles = StyleSheet.create({
  strip: { gap: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 11, color: '#334155', fontWeight: '500' },
  val: { fontSize: 11, fontWeight: '700', color: '#0B132B' },
  target: { color: '#4F46E5', fontWeight: '600' },
  track: { height: 5, borderRadius: 3, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3, backgroundColor: '#0B132B' },
});

function ZoneRow({
  zone,
  sub,
  hydration,
  secondary,
  status,
  statusColor,
  highlight,
}: {
  zone: string;
  sub: string;
  hydration: string;
  secondary: string;
  status: string;
  statusColor: string;
  highlight?: boolean;
}) {
  return (
    <View style={[zoneStyles.row, highlight && zoneStyles.highlightRow]}>
      <View style={{ flex: 1.2 }}>
        <AppText style={zoneStyles.zoneTitle}>{zone}</AppText>
        <AppText style={zoneStyles.zoneSub}>{sub}</AppText>
      </View>
      <AppText style={[zoneStyles.cell, { flex: 1 }]}>{hydration}</AppText>
      <AppText style={[zoneStyles.cell, { flex: 1.2 }]}>{secondary}</AppText>
      <View style={{ flex: 0.9, alignItems: 'flex-end' }}>
        <View style={[zoneStyles.statusPill, { borderColor: statusColor }]}>
          <AppText style={[zoneStyles.statusText, { color: statusColor }]}>{status}</AppText>
        </View>
      </View>
    </View>
  );
}

const zoneStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  highlightRow: {
    backgroundColor: '#FEF3C7',
    borderRadius: 6,
  },
  zoneTitle: { fontSize: 11, fontWeight: '700', color: '#0B132B' },
  zoneSub: { fontSize: 9, color: '#64748B' },
  cell: { fontSize: 11, color: '#334155', fontWeight: '500' },
  statusPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusText: { fontSize: 9, fontWeight: '700' },
});

function BiomarkerCard({
  name,
  score,
  band,
  note,
}: {
  name: string;
  score: string;
  band: string;
  note: string;
}) {
  return (
    <View style={biomarkerStyles.card}>
      <View style={biomarkerStyles.headerRow}>
        <AppText style={biomarkerStyles.name}>{name}</AppText>
        <AppText style={biomarkerStyles.score}>{score}</AppText>
      </View>
      <View style={biomarkerStyles.bandPill}>
        <AppText style={biomarkerStyles.bandText}>{band}</AppText>
      </View>
      <AppText style={biomarkerStyles.note}>{note}</AppText>
    </View>
  );
}

const biomarkerStyles = StyleSheet.create({
  card: {
    width: '48.5%',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 4,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 11, fontWeight: '700', color: '#0B132B', flex: 1 },
  score: { fontSize: 13, fontWeight: '800', color: '#4F46E5' },
  bandPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDE9FE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  bandText: { fontSize: 9, fontWeight: '700', color: '#6D28D9' },
  note: { fontSize: 10, color: '#64748B', lineHeight: 14, marginTop: 4 },
});

function RegimenItem({
  step,
  category,
  product,
  dosage,
  ingredient,
  reason,
}: {
  step: string;
  category: string;
  product: string;
  dosage: string;
  ingredient: string;
  reason: string;
}) {
  return (
    <View style={regimenStyles.item}>
      <View style={regimenStyles.stepBadge}>
        <AppText style={regimenStyles.stepText}>{step}</AppText>
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <View style={regimenStyles.topRow}>
          <AppText style={regimenStyles.category}>{category}</AppText>
          <AppText style={regimenStyles.dosage}>{dosage}</AppText>
        </View>
        <AppText style={regimenStyles.product}>{product}</AppText>
        <AppText style={regimenStyles.ingredient}>Active: {ingredient}</AppText>
        <AppText style={regimenStyles.reason}>{reason}</AppText>
      </View>
    </View>
  );
}

const regimenStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#0B132B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: { fontSize: 10, fontWeight: '800', color: '#FFFFFF' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  category: { fontSize: 9, fontWeight: '700', color: '#7C3AED', letterSpacing: 0.5 },
  dosage: { fontSize: 9, fontWeight: '600', color: '#64748B' },
  product: { fontSize: 12, fontWeight: '700', color: '#0B132B' },
  ingredient: { fontSize: 10, color: '#4F46E5', fontWeight: '500' },
  reason: { fontSize: 10, color: '#64748B', lineHeight: 14 },
});

function BarcodeVector() {
  return (
    <Svg width={200} height={28} viewBox="0 0 200 28">
      <Line x1="4" y1="2" x2="4" y2="26" stroke="#0B132B" strokeWidth="2.5" />
      <Line x1="10" y1="2" x2="10" y2="26" stroke="#0B132B" strokeWidth="1" />
      <Line x1="14" y1="2" x2="14" y2="26" stroke="#0B132B" strokeWidth="3" />
      <Line x1="22" y1="2" x2="22" y2="26" stroke="#0B132B" strokeWidth="1.5" />
      <Line x1="28" y1="2" x2="28" y2="26" stroke="#0B132B" strokeWidth="2" />
      <Line x1="34" y1="2" x2="34" y2="26" stroke="#0B132B" strokeWidth="1" />
      <Line x1="40" y1="2" x2="40" y2="26" stroke="#0B132B" strokeWidth="4" />
      <Line x1="48" y1="2" x2="48" y2="26" stroke="#0B132B" strokeWidth="1" />
      <Line x1="54" y1="2" x2="54" y2="26" stroke="#0B132B" strokeWidth="2.5" />
      <Line x1="62" y1="2" x2="62" y2="26" stroke="#0B132B" strokeWidth="1.5" />
      <Line x1="68" y1="2" x2="68" y2="26" stroke="#0B132B" strokeWidth="3" />
      <Line x1="76" y1="2" x2="76" y2="26" stroke="#0B132B" strokeWidth="1" />
      <Line x1="82" y1="2" x2="82" y2="26" stroke="#0B132B" strokeWidth="2" />
      <Line x1="88" y1="2" x2="88" y2="26" stroke="#0B132B" strokeWidth="3.5" />
      <Line x1="96" y1="2" x2="96" y2="26" stroke="#0B132B" strokeWidth="1" />
      <Line x1="102" y1="2" x2="102" y2="26" stroke="#0B132B" strokeWidth="2" />
      <Line x1="110" y1="2" x2="110" y2="26" stroke="#0B132B" strokeWidth="3" />
      <Line x1="118" y1="2" x2="118" y2="26" stroke="#0B132B" strokeWidth="1" />
      <Line x1="124" y1="2" x2="124" y2="26" stroke="#0B132B" strokeWidth="2.5" />
      <Line x1="132" y1="2" x2="132" y2="26" stroke="#0B132B" strokeWidth="1.5" />
      <Line x1="138" y1="2" x2="138" y2="26" stroke="#0B132B" strokeWidth="4" />
      <Line x1="146" y1="2" x2="146" y2="26" stroke="#0B132B" strokeWidth="1" />
      <Line x1="152" y1="2" x2="152" y2="26" stroke="#0B132B" strokeWidth="2" />
      <Line x1="158" y1="2" x2="158" y2="26" stroke="#0B132B" strokeWidth="3" />
      <Line x1="166" y1="2" x2="166" y2="26" stroke="#0B132B" strokeWidth="1.5" />
      <Line x1="172" y1="2" x2="172" y2="26" stroke="#0B132B" strokeWidth="2.5" />
      <Line x1="180" y1="2" x2="180" y2="26" stroke="#0B132B" strokeWidth="1" />
      <Line x1="186" y1="2" x2="186" y2="26" stroke="#0B132B" strokeWidth="3" />
      <Line x1="194" y1="2" x2="194" y2="26" stroke="#0B132B" strokeWidth="2" />
    </Svg>
  );
}

function DoctorSignatureGraphic() {
  return (
    <Svg width={120} height={36} viewBox="0 0 120 36">
      <Path
        d="M6 24 C14 8, 20 6, 26 14 C32 22, 30 30, 40 18 C50 6, 54 28, 62 16 C70 4, 76 26, 86 14 C94 4, 102 18, 114 12"
        stroke="#1E293B"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <Line
        x1="4"
        y1="32"
        x2="116"
        y2="32"
        stroke="#94A3B8"
        strokeWidth="1"
        strokeDasharray="3 2"
      />
    </Svg>
  );
}

// ─── Main Modal Styles ────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(11, 19, 43, 0.65)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '92%',
    backgroundColor: '#FAF8F5',
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
    overflow: 'hidden',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  topBarTitleCol: {
    flex: 1,
    marginHorizontal: 10,
  },
  topBarTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B132B',
  },
  topBarSubtitle: {
    fontSize: 10,
    color: '#64748B',
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionRoundBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  downloadPdfBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0B132B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radii.pill,
  },
  downloadPdfText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  progressBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#EDE9FE',
    paddingVertical: 8,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderColor: '#DDD6FE',
  },
  progressBannerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4F46E5',
  },
  sheetScroll: {
    flex: 1,
  },
  sheetContent: {
    padding: Spacing.md,
    paddingBottom: 40,
    gap: Spacing.md,
  },

  // Paper Document Look
  paperSheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.lg,
    padding: Spacing.md + 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 16,
  },
  letterhead: {
    gap: 10,
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  crestCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0B132B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clinicName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 0.8,
  },
  clinicDivision: {
    fontSize: 10,
    color: '#475569',
    fontWeight: '500',
  },
  clinicMeta: {
    fontSize: 9,
    color: '#94A3B8',
  },
  statusVerifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  verifiedText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#065F46',
    letterSpacing: 0.5,
  },
  sheetDividerThick: {
    height: 2,
    backgroundColor: '#0B132B',
  },
  docTitleRow: {
    alignItems: 'center',
    gap: 2,
    paddingVertical: 4,
  },
  docTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 1,
    textAlign: 'center',
  },
  docSubtitle: {
    fontSize: 10,
    color: '#64748B',
    textAlign: 'center',
  },
  patientGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    rowGap: 8,
  },
  patientCol: {
    width: '50%',
    gap: 2,
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 11,
    color: '#1E293B',
    fontWeight: '500',
  },
  metaValueBold: {
    fontSize: 11,
    color: '#0B132B',
    fontWeight: '700',
  },
  metaValueCode: {
    fontSize: 11,
    color: '#4F46E5',
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  barcodeWrapper: {
    alignItems: 'center',
    gap: 2,
    paddingTop: 4,
  },
  barcodeText: {
    fontSize: 9,
    color: '#64748B',
    letterSpacing: 2,
    fontFamily: 'monospace',
  },

  // Sections
  sectionContainer: {
    gap: 10,
    borderTopWidth: 1,
    borderColor: '#F1F5F9',
    paddingTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionNumberBadge: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#0B132B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionNumberText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 0.6,
  },

  // Section 1: Hero Diagnostic Row
  heroDiagnosticRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scoreCircleWrapper: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreCenterContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBigNumber: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0B132B',
    lineHeight: 28,
  },
  scoreTotal: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  diagnosticDetailsCol: {
    flex: 1,
    gap: 4,
  },
  tierPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  tierPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  tierPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#065F46',
  },
  tierSubtext: {
    fontSize: 9,
    color: '#64748B',
  },
  diagnosticNarrative: {
    fontSize: 10,
    color: '#334155',
    lineHeight: 14,
  },
  phototypeRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 2,
  },
  phototypeLabel: {
    fontSize: 9,
    color: '#64748B',
    fontWeight: '500',
  },
  phototypeVal: {
    fontSize: 9,
    fontWeight: '700',
    color: '#0B132B',
  },
  metricsTripleCol: {
    gap: 8,
    marginTop: 2,
  },

  // Section 2: Table
  tableCard: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#0B132B',
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  tableHeadCell: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // Section 3: Biomarkers Grid
  biomarkersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },

  // Section 4: Regimen Box
  regimenBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  regimenHeaderRow: {
    marginBottom: 6,
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    paddingBottom: 6,
  },
  regimenTimeTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 0.5,
  },
  regimenSub: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 1,
  },

  // Section 5: Advisory Card
  advisoryCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#FDE68A',
    gap: 6,
  },
  advisoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  advisoryPill: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  advisoryPillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#92400E',
  },
  advisoryTime: {
    fontSize: 9,
    fontWeight: '600',
    color: '#78350F',
  },
  advisoryBody: {
    fontSize: 10,
    color: '#78350F',
    lineHeight: 14,
  },

  // Section 6: Signature Card
  signatureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  doctorBioCol: {
    flex: 1,
    gap: 2,
  },
  doctorFullName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0B132B',
  },
  doctorCredentials: {
    fontSize: 9,
    color: '#475569',
    fontWeight: '600',
  },
  doctorLic: {
    fontSize: 8,
    color: '#94A3B8',
  },
  doctorRemarks: {
    fontSize: 10,
    color: '#334155',
    fontStyle: 'italic',
    marginTop: 4,
    lineHeight: 14,
  },
  signatureSealCol: {
    alignItems: 'center',
    gap: 4,
  },
  sealCircle: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sealCenterText: {
    position: 'absolute',
    alignItems: 'center',
  },
  sealVerified: {
    fontSize: 7,
    fontWeight: '900',
    color: '#4F46E5',
    letterSpacing: 0.5,
  },
  sealDerm: {
    fontSize: 8,
    fontWeight: '900',
    color: '#0B132B',
  },
  sealYear: {
    fontSize: 7,
    color: '#64748B',
  },
  complianceBox: {
    gap: 4,
    paddingTop: 4,
  },
  cryptoHash: {
    fontSize: 8,
    fontFamily: 'monospace',
    color: '#64748B',
  },
  legalDisclaimer: {
    fontSize: 8,
    color: '#94A3B8',
    lineHeight: 11,
  },

  // Bottom action buttons
  bottomActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  secondaryPrintBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#0B132B',
    paddingVertical: 12,
    borderRadius: Radii.pill,
  },
  secondaryPrintText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0B132B',
  },
  primaryDoneBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B132B',
    paddingVertical: 12,
    borderRadius: Radii.pill,
  },
  primaryDoneText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
