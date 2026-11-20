import React, { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { AppText, AppButton, AppCard, AppBadge, FaceGuideOverlay } from '@/components/ui';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, Radii } from '@/constants/theme';
import { useScanStore } from '@/store/useScanStore';
import { PRESET_FACE_SCANS, getPresetReport } from '@/features/analysis/sampleScans';
import {
  SafeCamera,
  SafeCameraRef,
  isNativeCameraAvailable,
  useSafeCameraPermissions,
} from '@/components/camera/SafeCamera';

export default function CameraScreen() {
  const { colors } = useTheme();
  const [permission, requestPermission] = useSafeCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('front');
  const [showPresets, setShowPresets] = useState(false);
  const { setCurrentReport, setSelectedImageUri } = useScanStore();
  const cameraRef = useRef<SafeCameraRef>(null);

  const handleCapture = async () => {
    try {
      if (cameraRef.current) {
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

    // Default fallback to balanced preset if camera is not available or fails
    handleSelectPreset('preset_balanced');
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
      {/* Camera Preview or Fallback View */}
      {isNativeCameraAvailable && permission?.granted ? (
        <SafeCamera ref={cameraRef} facing={facing} style={StyleSheet.absoluteFill}>
          <FaceGuideOverlay status="centered" isLightingGood />
        </SafeCamera>
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.placeholderBg]}>
          <FaceGuideOverlay status="centered" isLightingGood />
          <View style={styles.permissionBox}>
            <AppBadge
              label={
                isNativeCameraAvailable ? 'Permission Needed' : 'Rebuild Required for Live Camera'
              }
              variant="warning"
            />
            <AppText variant="h2" color="white" style={styles.centerText}>
              {isNativeCameraAvailable ? 'Camera Access Required' : 'Live Camera Not Compiled'}
            </AppText>
            <AppText variant="body" color="rgba(255,255,255,0.8)" style={styles.centerText}>
              {isNativeCameraAvailable
                ? 'Allow camera permission to capture face scans, or choose a simulated preset below.'
                : 'To enable hardware camera, rebuild your APK with `npx expo run:android`. Meanwhile, you can test all face scan analysis and routines using Sample Presets or Photo Upload below!'}
            </AppText>
            {isNativeCameraAvailable ? (
              <AppButton
                title="Grant Camera Access"
                onPress={requestPermission}
                variant="primary"
                size="md"
              />
            ) : (
              <AppButton
                title="Choose Sample Preset"
                onPress={() => setShowPresets(true)}
                variant="primary"
                size="md"
              />
            )}
          </View>
        </View>
      )}

      {/* Top Controls Bar */}
      <SafeAreaView style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.iconButton}>
          <AppText variant="h2" color="white">
            ✕
          </AppText>
        </Pressable>

        <View style={styles.guidancePill}>
          <AppText variant="caption" color="white" style={{ fontWeight: '600' }}>
            Hold level • Balanced lighting
          </AppText>
        </View>

        <Pressable
          onPress={() => setFacing(f => (f === 'front' ? 'back' : 'front'))}
          style={styles.iconButton}
        >
          <AppText variant="h3" color="white">
            🔄
          </AppText>
        </Pressable>
      </SafeAreaView>

      {/* Preset Selector Modal / Drawer */}
      {showPresets ? (
        <View style={styles.presetsDrawer}>
          <View style={styles.drawerHeader}>
            <AppText variant="h2">Select Sample Face Scan</AppText>
            <Pressable onPress={() => setShowPresets(false)}>
              <AppText variant="body" color={colors.primary}>
                Close
              </AppText>
            </Pressable>
          </View>
          <AppText variant="body" muted style={{ marginBottom: Spacing.sm }}>
            Simulate realistic skin conditions instantly:
          </AppText>
          <ScrollView style={{ maxHeight: 280 }} showsVerticalScrollIndicator={false}>
            {PRESET_FACE_SCANS.map(preset => (
              <Pressable
                key={preset.id}
                onPress={() => handleSelectPreset(preset.id)}
                style={styles.presetItem}
              >
                <AppText variant="h3">{preset.name}</AppText>
                <AppText variant="caption" muted>
                  {preset.description}
                </AppText>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ) : null}

      {/* Bottom Controls Bar */}
      <SafeAreaView style={styles.bottomBar}>
        <View style={styles.quickActions}>
          <Pressable onPress={() => setShowPresets(s => !s)} style={styles.secondaryActionBtn}>
            <AppText variant="caption" color="white">
              🧪 Sample Presets
            </AppText>
          </Pressable>

          <Pressable onPress={handlePickFromGallery} style={styles.secondaryActionBtn}>
            <AppText variant="caption" color="white">
              🖼️ Upload Photo
            </AppText>
          </Pressable>
        </View>

        <View style={styles.shutterRow}>
          <Pressable onPress={handleCapture} style={styles.shutterOuter}>
            <View style={styles.shutterInner} />
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  placeholderBg: {
    backgroundColor: '#1B262C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  permissionBox: {
    alignItems: 'center',
    gap: Spacing.md,
    maxWidth: 320,
    zIndex: 10,
  },
  centerText: {
    textAlign: 'center',
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: Radii.pill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guidancePill: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radii.pill,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Spacing.xl,
    gap: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  secondaryActionBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radii.pill,
  },
  shutterRow: {
    alignItems: 'center',
  },
  shutterOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#FFFFFF',
  },
  presetsDrawer: {
    position: 'absolute',
    bottom: 120,
    left: Spacing.md,
    right: Spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    zIndex: 100,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  presetItem: {
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
    gap: 2,
  },
});
