import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { AppText } from '@/components/ui';
import {
  ChevronLeftIcon,
  CloseIcon,
  GridDotsIcon,
  FaceScanLogo,
  ScanViewfinderIcon,
  DermaLightIcon,
  LensFlipIcon,
  CpuChipIcon,
} from '@/components/ui/icons';
import { Spacing, Radii } from '@/constants/theme';
import { useScanStore } from '@/store/useScanStore';
import { PRESET_FACE_SCANS, getPresetReport } from '@/features/analysis/sampleScans';
import {
  SafeCamera,
  SafeCameraRef,
  isNativeCameraAvailable,
  useSafeCameraPermissions,
} from '@/components/camera/SafeCamera';
import { LiveFaceScanOverlay, SimulatedFaceView } from '@/components/scan';

type ScanMode = 'full' | 'acne' | 'lines';

export default function CameraScreen() {
  const [permission, requestPermission] = useSafeCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('front');
  const [scanMode, setScanMode] = useState<ScanMode>('full');
  const [dermaLightActive, setDermaLightActive] = useState(false);
  const [showMeshGrid, setShowMeshGrid] = useState(true);
  const [showPresets, setShowPresets] = useState(false);
  const { setCurrentReport, setSelectedImageUri } = useScanStore();
  const cameraRef = useRef<SafeCameraRef>(null);

  const handleCapture = async () => {
    try {
      if (cameraRef.current && isNativeCameraAvailable && permission?.granted) {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
        if (photo?.uri) {
          setSelectedImageUri(photo.uri);
          router.push({
            pathname: '/scan/processing',
            params: { mode: 'camera', imageUri: photo.uri },
          });
          return;
        }
      }
    } catch (err) {
      console.warn('Capture failed, falling back to preset', err);
    }

    // Default fallback to realistic simulated preset
    const presetId =
      scanMode === 'acne'
        ? 'preset_oily_tzone'
        : scanMode === 'lines'
          ? 'preset_dry_texture'
          : 'preset_balanced';
    handleSelectPreset(presetId);
  };

  const handleSelectPreset = (presetId: string) => {
    const report = getPresetReport(presetId);
    setCurrentReport(report);
    router.push({
      pathname: '/scan/processing',
      params: { mode: 'preset', presetId },
    });
  };

  const handlePickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]?.uri) {
        setSelectedImageUri(result.assets[0].uri);
        router.push({
          pathname: '/scan/processing',
          params: { mode: 'gallery', imageUri: result.assets[0].uri },
        });
      }
    } catch (err) {
      console.warn('Gallery pick failed', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* ── Background: Hardware Camera or Studio Simulation ───── */}
      {isNativeCameraAvailable && permission?.granted ? (
        <SafeCamera ref={cameraRef} facing={facing} style={StyleSheet.absoluteFill} />
      ) : (
        <SimulatedFaceView />
      )}

      {/* ── Augmented Biometric HUD & Landmark Overlay ─────────── */}
      <LiveFaceScanOverlay mode={scanMode} showMeshGrid={showMeshGrid} />

      {/* ── Screen UI Content Layer ────────────────────────────── */}
      <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
        {/* ── 1. Top Brand Header Bar ──────────────────────────── */}
        <View style={styles.headerBar}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.headerCircleBtn, pressed && { opacity: 0.8 }]}
          >
            <ChevronLeftIcon size={18} color="#0B132B" />
          </Pressable>

          <View style={styles.headerBrandCol}>
            <View style={styles.headerLogoRow}>
              <FaceScanLogo size={24} />
              <AppText style={styles.headerTitle}>Live Scan AI</AppText>
            </View>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View profile"
            onPress={() => router.push('/Profile')}
            style={styles.avatarCircle}
          >
            <View style={styles.avatarInner} />
          </Pressable>
        </View>

        {/* ── 2. Top Viewport Controls Bar ─────────────────────── */}
        <View style={styles.viewportControlsBar}>
          {/* Close Button ✕ */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close live scan"
            onPress={() => router.back()}
            style={({ pressed }) => [styles.controlPillBtn, pressed && { opacity: 0.8 }]}
          >
            <CloseIcon size={16} color="#0B132B" />
          </Pressable>

          {/* Optimal Lux & CRI Pill */}
          <View style={styles.luxPill}>
            <View style={styles.blueDot} />
            <AppText style={styles.luxBoldText}>OPTIMAL LUX</AppText>
            <AppText style={styles.luxDotSeparator}>•</AppText>
            <AppText style={styles.luxCriText}>94 CRI Verified</AppText>
          </View>

          {/* Matrix / Grid Toggle Button */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Toggle biometric neural mesh"
            onPress={() => setShowMeshGrid(g => !g)}
            style={({ pressed }) => [
              styles.controlPillBtn,
              !showMeshGrid && { backgroundColor: '#E2E8F0' },
              pressed && { opacity: 0.8 },
            ]}
          >
            <GridDotsIcon size={16} color="#0B132B" />
          </Pressable>
        </View>

        {/* ── 3. Face Alignment Guidance Instruction Pill ──────── */}
        <View style={styles.guidanceRow}>
          <View style={styles.guidancePill}>
            <ScanViewfinderIcon size={14} color="#0B132B" />
            <AppText style={styles.guidanceText}>
              Align face inside <AppText style={styles.guidanceBold}>oval frame</AppText> • Hold
              steady
            </AppText>
          </View>
        </View>

        {/* Permission Request Prompt if Camera ungranted */}
        {isNativeCameraAvailable && !permission?.granted && (
          <View style={styles.permissionBanner}>
            <AppText style={styles.permissionText}>
              Camera permission required for live hardware capture
            </AppText>
            <Pressable onPress={requestPermission} style={styles.permissionBtn}>
              <AppText style={styles.permissionBtnText}>Enable Camera</AppText>
            </Pressable>
          </View>
        )}

        {/* Spacer to push controls to bottom */}
        <View style={{ flex: 1 }} />

        {/* ── 4. Scan Mode Segmented Tab Bar ───────────────────── */}
        <View style={styles.modeTabsWrapper}>
          <View style={styles.modeTabsContainer}>
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: scanMode === 'full' }}
              onPress={() => setScanMode('full')}
              style={[styles.modeTab, scanMode === 'full' && styles.modeTabActive]}
            >
              <AppText
                style={[styles.modeTabText, scanMode === 'full' && styles.modeTabTextActive]}
              >
                Full Scan
              </AppText>
            </Pressable>

            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: scanMode === 'acne' }}
              onPress={() => setScanMode('acne')}
              style={[styles.modeTab, scanMode === 'acne' && styles.modeTabActive]}
            >
              <AppText
                style={[styles.modeTabText, scanMode === 'acne' && styles.modeTabTextActive]}
              >
                Acne & Pores
              </AppText>
            </Pressable>

            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: scanMode === 'lines' }}
              onPress={() => setScanMode('lines')}
              style={[styles.modeTab, scanMode === 'lines' && styles.modeTabActive]}
            >
              <AppText
                style={[styles.modeTabText, scanMode === 'lines' && styles.modeTabTextActive]}
              >
                Fine Lines
              </AppText>
            </Pressable>
          </View>
        </View>

        {/* ── 5. "Live Scan In Progress" Notice ────────────────── */}
        <View style={styles.statusNoticeRow}>
          <AppText style={styles.statusNoticeText}>Live Scan In Progress</AppText>
        </View>

        {/* ── 6. Bottom Shutter & Hardware Controls ────────────── */}
        <View style={styles.shutterControlsRow}>
          {/* DERMA-LIGHT Button */}
          <View style={styles.hardwareBtnCol}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Toggle Derma-Light"
              onPress={() => setDermaLightActive(a => !a)}
              style={({ pressed }) => [
                styles.hardwareRoundBtn,
                dermaLightActive && styles.hardwareBtnActive,
                pressed && { opacity: 0.85 },
              ]}
            >
              <DermaLightIcon size={20} color={dermaLightActive ? '#4F46E5' : '#0B132B'} />
            </Pressable>
            <AppText style={styles.hardwareBtnLabel}>DERMA-LIGHT</AppText>
          </View>

          {/* Shutter Capture Button with Glowing Halo */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Capture face scan"
            onPress={handleCapture}
            style={({ pressed }) => [
              styles.shutterHaloRing,
              pressed && { transform: [{ scale: 0.96 }] },
            ]}
          >
            <View style={styles.shutterInnerRing}>
              <View style={styles.shutterReticleBox}>
                <AppText style={styles.shutterReticleText}>CSV</AppText>
              </View>
            </View>
          </Pressable>

          {/* LENS FLIP Button */}
          <View style={styles.hardwareBtnCol}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Flip camera lens"
              onPress={() => setFacing(f => (f === 'front' ? 'back' : 'front'))}
              style={({ pressed }) => [styles.hardwareRoundBtn, pressed && { opacity: 0.85 }]}
            >
              <LensFlipIcon size={20} color="#0B132B" />
            </Pressable>
            <AppText style={styles.hardwareBtnLabel}>LENS FLIP</AppText>
          </View>
        </View>

        {/* ── 7. Bottom Telemetry Status Line ──────────────────── */}
        <View style={styles.footerTelemetryRow}>
          <View style={styles.footerLeftCol}>
            <CpuChipIcon size={14} color="#4F46E5" />
            <AppText style={styles.footerMeshText}>NEURAL MESH V4.2 ACTIVE</AppText>
          </View>

          <View style={styles.footerRightCol}>
            <View style={styles.blueDot} />
            <AppText style={styles.footerLatencyText}>3D Latency: 14ms</AppText>
          </View>
        </View>

        {/* Secondary options row for developers & upload testing */}
        <View style={styles.devBarRow}>
          <Pressable onPress={() => setShowPresets(s => !s)} hitSlop={6}>
            <AppText style={styles.devBarText}>🧪 Presets</AppText>
          </Pressable>
          <AppText style={styles.devBarText}>•</AppText>
          <Pressable onPress={handlePickFromGallery} hitSlop={6}>
            <AppText style={styles.devBarText}>🖼️ Upload Photo</AppText>
          </Pressable>
        </View>

        {/* Preset Selector Drawer */}
        {showPresets && (
          <View style={styles.presetsDrawer}>
            <View style={styles.drawerHeader}>
              <AppText style={styles.drawerTitle}>Simulated Diagnostic Presets</AppText>
              <Pressable onPress={() => setShowPresets(false)} hitSlop={8}>
                <AppText style={styles.drawerCloseText}>Close</AppText>
              </Pressable>
            </View>
            <ScrollView style={{ maxHeight: 220 }} showsVerticalScrollIndicator={false}>
              {PRESET_FACE_SCANS.map(preset => (
                <Pressable
                  key={preset.id}
                  onPress={() => handleSelectPreset(preset.id)}
                  style={styles.presetItem}
                >
                  <AppText style={styles.presetName}>{preset.name}</AppText>
                  <AppText style={styles.presetDesc}>{preset.description}</AppText>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  // 1. Header Bar
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF8F5',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1EFEA',
  },
  headerCircleBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBrandCol: {
    alignItems: 'center',
  },
  headerLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.3,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: Radii.pill,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    backgroundColor: '#F5D0C5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: 24,
    height: 24,
    borderRadius: Radii.pill,
    backgroundColor: '#D99B87',
  },

  // 2. Viewport Controls Bar
  viewportControlsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginTop: 10,
  },
  controlPillBtn: {
    width: 38,
    height: 38,
    borderRadius: Radii.pill,
    backgroundColor: '#FAF8F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  luxPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8F5',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radii.pill,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
  },
  luxBoldText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 0.6,
  },
  luxDotSeparator: {
    color: '#94A3B8',
    fontSize: 12,
  },
  luxCriText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },

  // 3. Guidance Row
  guidanceRow: {
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: Spacing.md,
  },
  guidancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  guidanceText: {
    fontSize: 12,
    color: '#475569',
  },
  guidanceBold: {
    fontWeight: '800',
    color: '#0B132B',
  },

  // Permission banner
  permissionBanner: {
    marginHorizontal: Spacing.md,
    marginTop: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: Radii.md,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  permissionText: {
    fontSize: 11,
    color: '#0B132B',
    flex: 1,
  },
  permissionBtn: {
    backgroundColor: '#0B132B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.sm,
    marginLeft: 8,
  },
  permissionBtnText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // 4. Mode Tabs
  modeTabsWrapper: {
    alignItems: 'center',
    marginBottom: 6,
  },
  modeTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.pill,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  modeTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radii.pill,
  },
  modeTabActive: {
    backgroundColor: '#0B132B',
  },
  modeTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  modeTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  // 5. Status Notice
  statusNoticeRow: {
    alignItems: 'center',
    marginBottom: 10,
  },
  statusNoticeText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.95)',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // 6. Shutter & Hardware Controls
  shutterControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: 8,
  },
  hardwareBtnCol: {
    alignItems: 'center',
    gap: 6,
    width: 80,
  },
  hardwareRoundBtn: {
    width: 48,
    height: 48,
    borderRadius: Radii.pill,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  hardwareBtnActive: {
    backgroundColor: '#EDE9FE',
    borderColor: '#818CF8',
  },
  hardwareBtnLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: 0.6,
  },
  shutterHaloRing: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: 'rgba(99, 102, 241, 0.25)',
    borderWidth: 2.5,
    borderColor: '#818CF8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 6,
  },
  shutterInnerRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 3,
    borderColor: '#0B132B',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterReticleBox: {
    width: 38,
    height: 24,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: '#0B132B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterReticleText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 0.5,
  },

  // 7. Footer Telemetry Row
  footerTelemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  footerLeftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerMeshText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: 0.6,
  },
  footerRightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  footerLatencyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0B132B',
  },

  // Dev options
  devBarRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingBottom: 4,
  },
  devBarText: {
    fontSize: 11,
    color: 'rgba(11, 19, 43, 0.7)',
    fontWeight: '500',
  },

  // Presets Drawer
  presetsDrawer: {
    position: 'absolute',
    bottom: 90,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.lg,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 100,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  drawerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B132B',
  },
  drawerCloseText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4F46E5',
  },
  presetItem: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E2E8F0',
    gap: 2,
  },
  presetName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0B132B',
  },
  presetDesc: {
    fontSize: 11,
    color: '#64748B',
  },
});
