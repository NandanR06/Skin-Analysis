import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppText, AppButton, AppCard, AppBadge } from '../../components/ui';
import { useTheme } from '../../hooks/use-theme';
import { Spacing, Radii } from '../../constants/theme';
import { useProfileStore } from '../../store/useProfileStore';
import { useScanStore } from '../../store/useScanStore';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { profile, resetProfile } = useProfileStore();
  const { scanHistory, deleteScanFromHistory, clearAllScanHistory, setCurrentReport } =
    useScanStore();
  const [clearing, setClearing] = useState(false);

  const handleClearData = () => {
    Alert.alert(
      'Clear All Local Data?',
      'This will delete all saved scans, cosmetic observations, and questionnaire answers from your device. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Everything',
          style: 'destructive',
          onPress: async () => {
            setClearing(true);
            await clearAllScanHistory();
            await resetProfile();
            setClearing(false);
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <AppText variant="h1" color={colors.primaryForeground}>
              👤
            </AppText>
          </View>
          <View style={styles.headerInfo}>
            <AppText variant="h1">Skin Profile & Privacy</AppText>
            <AppText variant="body" muted>
              Manage preferences, history, and on-device data.
            </AppText>
          </View>
        </View>

        {/* Skin Profile Summary Card */}
        <AppCard elevated style={styles.profileCard}>
          <View style={styles.cardHeader}>
            <AppText variant="h2">Skin Profile</AppText>
            <AppBadge
              label={profile.completedAt ? 'Completed' : 'Pending'}
              variant={profile.completedAt ? 'success' : 'warning'}
            />
          </View>

          <View style={styles.detailRow}>
            <AppText variant="body" muted>
              Skin Feel:
            </AppText>
            <AppText variant="body" style={styles.capitalize}>
              {profile.skinFeel.replace('_', ' ')}
            </AppText>
          </View>

          <View style={styles.detailRow}>
            <AppText variant="body" muted>
              Sensitivity:
            </AppText>
            <AppText variant="body" style={styles.capitalize}>
              {profile.sensitivity.replace('_', ' ')}
            </AppText>
          </View>

          <View style={styles.detailRow}>
            <AppText variant="body" muted>
              Primary Concerns:
            </AppText>
            <AppText variant="body" style={styles.capitalize}>
              {profile.primaryConcerns.map(c => c.replace('_', ' ')).join(', ')}
            </AppText>
          </View>

          <AppButton
            title={profile.completedAt ? 'Update Questionnaire' : 'Complete Questionnaire'}
            onPress={() => router.push('/questionnaire')}
            variant="outline"
            size="md"
            style={{ marginTop: Spacing.xs }}
          />
        </AppCard>

        {/* Scan History Section */}
        <AppCard elevated style={styles.historyCard}>
          <View style={styles.cardHeader}>
            <AppText variant="h2">Scan History</AppText>
            <AppBadge label={`${scanHistory.length} Scans`} variant="neutral" />
          </View>

          {scanHistory.length === 0 ? (
            <AppText variant="body" muted style={{ paddingVertical: Spacing.sm }}>
              No previous scans saved. Completed face scans will appear here.
            </AppText>
          ) : (
            <View style={styles.historyList}>
              {scanHistory.map(scan => (
                <Pressable
                  key={scan.scanId}
                  onPress={() => {
                    setCurrentReport(scan);
                    router.push('/scan/results');
                  }}
                  style={({ pressed }) => [
                    styles.historyItem,
                    { borderColor: colors.border },
                    pressed && { backgroundColor: colors.secondary },
                  ]}
                >
                  <View style={styles.historyItemLeft}>
                    <AppText variant="h3">{scan.summaryObservations.primaryFocus}</AppText>
                    <AppText variant="caption" muted>
                      {new Date(scan.capturedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </AppText>
                  </View>

                  <View style={styles.historyItemRight}>
                    <View style={[styles.scorePill, { backgroundColor: colors.secondary }]}>
                      <AppText
                        variant="caption"
                        color={colors.primary}
                        style={{ fontWeight: '700' }}
                      >
                        {scan.overallScore}
                      </AppText>
                    </View>
                    <Pressable
                      onPress={e => {
                        e.stopPropagation();
                        deleteScanFromHistory(scan.scanId);
                      }}
                      style={styles.deleteBtn}
                    >
                      <AppText variant="caption" color={colors.error}>
                        ✕
                      </AppText>
                    </Pressable>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </AppCard>

        {/* Privacy & Ethical Standards */}
        <AppCard elevated style={styles.privacyCard}>
          <AppText variant="h3">🔒 Privacy & Data Retention</AppText>
          <AppText variant="body" muted style={styles.privacyDesc}>
            All image quality checks and cosmetic observations execute entirely on your device. We
            do not store raw face images in the cloud or perform facial identity recognition.
          </AppText>
          <AppButton
            title="Delete All Data & History"
            onPress={handleClearData}
            loading={clearing}
            variant="outline"
            size="md"
            style={styles.dangerButton}
          />
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    flex: 1,
    gap: 2,
  },
  profileCard: {
    gap: Spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  capitalize: {
    textTransform: 'capitalize',
    fontWeight: '500',
  },
  historyCard: {
    gap: Spacing.sm,
  },
  historyList: {
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 1,
  },
  historyItemLeft: {
    gap: 2,
    flex: 1,
  },
  historyItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  scorePill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  deleteBtn: {
    padding: Spacing.xs,
  },
  privacyCard: {
    gap: Spacing.sm,
  },
  privacyDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  dangerButton: {
    marginTop: Spacing.xs,
    borderColor: '#EF4444',
  },
});
