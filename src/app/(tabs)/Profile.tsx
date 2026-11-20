import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppText, AppButton, AppCard, AppBadge } from '@/components/ui';
import { Spacing, Radii, Colors } from '@/constants/theme';
import { useProfileStore } from '@/store/useProfileStore';
import { useScanStore } from '@/store/useScanStore';

const C = Colors.light;

export default function ProfileScreen() {
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
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Profile Hero ─────────────────────────── */}
        <View style={styles.heroSection}>
          <View style={[styles.avatarCircle, { backgroundColor: C.primary }]}>
            <AppText style={{ fontSize: 36 }}>👤</AppText>
          </View>
          <View style={{ flex: 1 }}>
            <AppText variant="h1">Skin Profile</AppText>
            <AppText variant="body" color={C.textMuted} style={{ marginTop: 4 }}>
              Manage preferences, history & on-device data
            </AppText>
          </View>
        </View>

        {/* ── Profile Details Card ─────────────────── */}
        <AppCard elevated style={styles.profileCard}>
          <View style={styles.cardHeader}>
            <AppText variant="h2">Questionnaire</AppText>
            <AppBadge
              label={profile.completedAt ? 'Completed' : 'Pending'}
              variant={profile.completedAt ? 'success' : 'warning'}
            />
          </View>

          <View style={styles.divider} />

          <DetailRow label="Skin Feel" value={profile.skinFeel.replace('_', ' ')} />
          <DetailRow label="Sensitivity" value={profile.sensitivity.replace('_', ' ')} />
          <DetailRow
            label="Concerns"
            value={profile.primaryConcerns.map(c => c.replace('_', ' ')).join(', ') || 'Not set'}
          />

          <AppButton
            title={profile.completedAt ? 'Update Questionnaire' : 'Complete Questionnaire'}
            onPress={() => router.push('/questionnaire')}
            variant="outline"
            size="md"
            style={{ marginTop: Spacing.sm }}
          />
        </AppCard>

        {/* ── Scan History Card ────────────────────── */}
        <AppCard elevated style={styles.historyCard}>
          <View style={styles.cardHeader}>
            <AppText variant="h2">Scan History</AppText>
            <View style={[styles.countBadge, { backgroundColor: C.secondary }]}>
              <AppText variant="caption" color={C.primary} style={{ fontWeight: '700' }}>
                {scanHistory.length}
              </AppText>
            </View>
          </View>

          <View style={styles.divider} />

          {scanHistory.length === 0 ? (
            <View style={styles.emptyHistory}>
              <AppText style={{ fontSize: 32, textAlign: 'center' }}>🔬</AppText>
              <AppText
                variant="body"
                color={C.textMuted}
                style={{ textAlign: 'center', marginTop: 8 }}
              >
                No scans yet. Complete a face scan to build your history.
              </AppText>
            </View>
          ) : (
            <View style={styles.historyList}>
              {scanHistory.map(scan => (
                <Pressable
                  key={scan.scanId}
                  onPress={() => {
                    setCurrentReport(scan);
                    router.push({
                      pathname: '/scan/[id]',
                      params: { id: scan.scanId },
                    });
                  }}
                  style={({ pressed }) => [
                    styles.historyItem,
                    pressed && { backgroundColor: C.secondary },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <AppText variant="h3">{scan.summaryObservations.primaryFocus}</AppText>
                    <AppText variant="caption" color={C.textMuted} style={{ marginTop: 2 }}>
                      {new Date(scan.capturedAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </AppText>
                  </View>

                  <View style={styles.historyRight}>
                    <View style={[styles.scorePill, { backgroundColor: C.secondary }]}>
                      <AppText variant="caption" color={C.primary} style={{ fontWeight: '700' }}>
                        {scan.overallScore}
                      </AppText>
                    </View>
                    <Pressable
                      onPress={e => {
                        e.stopPropagation();
                        deleteScanFromHistory(scan.scanId);
                      }}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <AppText variant="caption" color={C.error}>
                        ✕
                      </AppText>
                    </Pressable>
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </AppCard>

        {/* ── Privacy Card ─────────────────────────── */}
        <AppCard tinted style={styles.privacyCard}>
          <AppText variant="h3">🔒 Privacy & Data Retention</AppText>
          <AppText
            variant="body"
            color={C.textSecondary}
            style={{ marginTop: Spacing.sm, lineHeight: 20 }}
          >
            All image quality checks and cosmetic observations execute entirely on your device. We
            do not store raw face images in the cloud or perform facial identity recognition.
          </AppText>
          <AppButton
            title="Delete All Data & History"
            onPress={handleClearData}
            loading={clearing}
            variant="danger"
            size="md"
            style={{ marginTop: Spacing.sm }}
          />
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={rowStyles.row}>
      <AppText variant="body" color={C.textMuted}>
        {label}
      </AppText>
      <AppText
        variant="body"
        style={{ fontWeight: '500', textTransform: 'capitalize', flex: 1, textAlign: 'right' }}
      >
        {value}
      </AppText>
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
    gap: Spacing.md,
  },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.background },
  scroll: { padding: Spacing.lg, gap: Spacing.md, paddingBottom: Spacing['2xl'] },

  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileCard: { gap: 0, padding: Spacing.lg },
  historyCard: { gap: 0, padding: Spacing.lg },
  privacyCard: { gap: 0 },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: C.border,
    marginBottom: Spacing.sm,
  },
  countBadge: {
    width: 28,
    height: 28,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // History
  emptyHistory: { paddingVertical: Spacing.lg, gap: 0 },
  historyList: { gap: Spacing.xs },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: C.border,
    gap: Spacing.sm,
  },
  historyRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  scorePill: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
});
