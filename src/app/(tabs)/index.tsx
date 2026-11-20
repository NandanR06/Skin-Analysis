import { AppButton, AppCard, AppText } from '@/components/ui';
import { Colors, Radii, Shadow, Spacing } from '@/constants/theme';
import { useProfileStore } from '@/store/useProfileStore';
import { useScanStore } from '@/store/useScanStore';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = Colors.light;

export default function HomeScreen() {
  const { currentReport, loadScanHistory } = useScanStore();
  const { profile, loadProfile } = useProfileStore();
  const [user, setUser] = useState(true);

  useEffect(() => {
    loadScanHistory();
    loadProfile();
  }, []);

  useEffect(() => {
    if (!user) router.push('/scan/login')
  }, [])

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Top Bar ─────────────────────────────── */}
        <View style={styles.topBar}>
          <View>
            <AppText variant="overline" color={C.textMuted}>
              COSMETIC WELLNESS
            </AppText>
            <AppText variant="h2" style={{ marginTop: 2 }}>
              Face Scan & Analysis
            </AppText>
          </View>
          <Pressable
            onPress={() => router.push('/questionnaire')}
            style={[styles.avatarBtn, { backgroundColor: C.primary }]}
          >
            <AppText style={{ fontSize: 20 }}>🌿</AppText>
          </Pressable>
        </View>

        {/* ── Hero Card ───────────────────────────── */}
        <View style={[styles.heroCard, Shadow.lg]}>
          {/* gradient-like top strip */}
          <View style={styles.heroStrip}>
            <View style={styles.heroBadgeRow}>
              <View style={styles.liveChip}>
                <View style={styles.liveDot} />
                <AppText
                  variant="caption"
                  color="rgba(255,255,255,0.9)"
                  style={{ fontWeight: '700' }}
                >
                  ON-DEVICE
                </AppText>
              </View>
              <AppText variant="caption" color="rgba(255,255,255,0.75)">
                100% Private
              </AppText>
            </View>

            <AppText variant="h1" color="#FFFFFF" style={{ marginTop: Spacing.sm }}>
              Begin Face Scan
            </AppText>
            <AppText variant="body" color="rgba(255,255,255,0.85)" style={styles.heroDesc}>
              Position your face within the guide under balanced lighting to evaluate shine,
              redness, texture & tone.
            </AppText>
          </View>

          <View style={styles.heroFooter}>
            <AppButton
              title="✦  Start Face Scan"
              onPress={() => router.push('/scan/camera')}
              variant="primary"
              size="lg"
              style={styles.heroBtn}
            />
            <AppText
              variant="caption"
              color={C.textSecondary}
              style={{ textAlign: 'center', marginTop: Spacing.xs }}
            >
              No images leave your device
            </AppText>
          </View>
        </View>

        {/* ── Quick Stats Row ─────────────────────── */}
        <View style={styles.statsRow}>
          <StatChip icon="📊" label="Scans" value={currentReport ? '1+' : '0'} />
          <StatChip icon="🌿" label="Profile" value={profile.completedAt ? 'Done' : 'Pending'} />
          <StatChip
            icon="⭐"
            label="Score"
            value={currentReport ? String(currentReport.overallScore) : '—'}
          />
        </View>

        {/* ── Questionnaire Banner ─────────────────── */}
        {!profile.completedAt && (
          <Pressable
            onPress={() => router.push('/questionnaire')}
            style={({ pressed }) => [styles.questBanner, pressed && { opacity: 0.9 }]}
          >
            <View style={styles.questLeft}>
              <AppText style={{ fontSize: 28 }}>📋</AppText>
              <View style={{ flex: 1 }}>
                <AppText variant="h3">Complete Skin Profile</AppText>
                <AppText variant="caption" color={C.textMuted} style={{ marginTop: 2 }}>
                  5 quick questions · ~1 min
                </AppText>
              </View>
            </View>
            <AppText variant="h2" color={C.primary}>
              ›
            </AppText>
          </Pressable>
        )}

        {/* ── Latest Scan Card ─────────────────────── */}
        {currentReport ? (
          <AppCard elevated style={styles.latestCard}>
            <View style={styles.latestHeader}>
              <View>
                <AppText variant="overline" color={C.textMuted}>
                  LATEST OBSERVATION
                </AppText>
                <AppText variant="h2" style={{ marginTop: 2 }}>
                  {currentReport.summaryObservations.primaryFocus}
                </AppText>
              </View>
              <View style={styles.scoreBubble}>
                <AppText variant="h1" color={C.primary}>
                  {currentReport.overallScore}
                </AppText>
                <AppText variant="caption" color={C.textMuted}>
                  Index
                </AppText>
              </View>
            </View>

            {/* Metric Pills Row */}
            <View style={styles.metricRow}>
              <MetricPill label="Shine" value={currentReport.summaryObservations.shineOverall} />
              <MetricPill
                label="Redness"
                value={currentReport.summaryObservations.rednessOverall}
              />
              <MetricPill
                label="Texture"
                value={currentReport.summaryObservations.textureOverall}
              />
              <MetricPill label="Tone" value={currentReport.summaryObservations.toneOverall} />
            </View>

            <View style={styles.actionRow}>
              <AppButton
                title="Full Report"
                onPress={() => router.push('/scan/results')}
                variant="outline"
                size="sm"
                style={{ flex: 1 }}
              />
              <AppButton
                title="My Routine"
                onPress={() => router.push('/routine')}
                variant="primary"
                size="sm"
                style={{ flex: 1 }}
              />
            </View>
          </AppCard>
        ) : (
          <AppCard style={styles.emptyCard} tinted>
            <AppText style={{ fontSize: 36, textAlign: 'center' }}>🔬</AppText>
            <AppText variant="h3" style={{ textAlign: 'center', marginTop: Spacing.sm }}>
              No Scans Yet
            </AppText>
            <AppText
              variant="body"
              color={C.textMuted}
              style={{ textAlign: 'center', marginTop: 4 }}
            >
              Complete your first face scan above to see your cosmetic observations.
            </AppText>
          </AppCard>
        )}

        {/* ── Disclaimer ───────────────────────────── */}
        <View style={styles.disclaimer}>
          <AppText
            variant="caption"
            color={C.textMuted}
            style={{ textAlign: 'center', lineHeight: 18 }}
          >
            🛡️ Cosmetic estimations only · Not a medical device · Does not diagnose skin conditions
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatChip({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={statStyles.chip}>
      <AppText style={{ fontSize: 20 }}>{icon}</AppText>
      <AppText variant="caption" color={C.textMuted}>
        {label}
      </AppText>
      <AppText variant="h3" color={C.primary}>
        {value}
      </AppText>
    </View>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={metricStyles.pill}>
      <AppText variant="caption" color={C.textMuted}>
        {label}
      </AppText>
      <AppText
        variant="caption"
        color={C.primary}
        style={{ fontWeight: '700', marginTop: 2, textTransform: 'capitalize' }}
      >
        {value}
      </AppText>
    </View>
  );
}

const statStyles = StyleSheet.create({
  chip: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radii.lg,
    gap: 2,
    borderWidth: 1,
    borderColor: C.cardBorder,
    ...Shadow.sm,
  },
});

const metricStyles = StyleSheet.create({
  pill: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: C.secondary,
    paddingVertical: Spacing.sm,
    borderRadius: Radii.sm,
    gap: 1,
  },
});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.background,
  },
  scroll: {
    padding: Spacing.lg,
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Hero
  heroCard: {
    borderRadius: Radii.xl,
    overflow: 'hidden',
    backgroundColor: C.primary,
  },
  heroStrip: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: 0,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    gap: 5,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6EE7B7',
  },
  heroDesc: {
    marginTop: Spacing.sm,
    lineHeight: 22,
    opacity: 0.9,
  },
  heroFooter: {
    backgroundColor: '#FFFFFF',
    padding: Spacing.md,
    paddingTop: Spacing.sm + 4,
  },
  heroBtn: {
    backgroundColor: C.primary,
    borderRadius: Radii.md,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: 2,
  },

  // Questionnaire banner
  questBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: C.primaryLight,
    borderStyle: 'dashed',
  },
  questLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },

  // Latest scan
  latestCard: {
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  latestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  scoreBubble: {
    width: 64,
    height: 64,
    borderRadius: Radii.pill,
    backgroundColor: C.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  actionRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: 4,
  },

  // Empty
  emptyCard: {
    padding: Spacing.xl,
    gap: 0,
    alignItems: 'center',
  },

  // Disclaimer
  disclaimer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.xs,
  },
});
