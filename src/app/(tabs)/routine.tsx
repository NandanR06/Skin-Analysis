import {
  DermatologyInsightBanner,
  PrecisionRecommendationCard,
  RegimenFlowList,
  RegimenProgressCard,
  RegimenStepItem,
  RoutineHeader,
  StreakCalendarCard,
} from '@/components/routine';
import { AppText } from '@/components/ui';
import { MoonIcon, SunIcon } from '@/components/ui/icons';
import { Colors, Radii, Spacing } from '@/constants/theme';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const C = Colors.light;

const INITIAL_AM_STEPS: RegimenStepItem[] = [
  {
    id: 'step_1',
    stepNum: 'STEP 01',
    category: 'CLEANSE',
    timeTag: '08:16 AM',
    title: 'Gentle Amino Foaming Cleanser',
    description: 'Balanced pH 5.5 formulation. Preserved skin natural lipids.',
    chips: [
      { label: '60s Wash', variant: 'sand' },
      { label: 'Sebum Cleared', variant: 'lavender' },
    ],
    isCompleted: true,
  },
  {
    id: 'step_2',
    stepNum: 'STEP 02',
    category: 'TREAT',
    timeTag: '08:18 AM',
    title: 'Niacinamide 10% + Zinc Pore Serum',
    description: 'Calms inflammation & refines T-zone texture.',
    chips: [
      { label: '4 Drops', variant: 'sand' },
      { label: 'Pore Minimizing', variant: 'purple' },
    ],
    isCompleted: true,
  },
  {
    id: 'step_3',
    stepNum: 'STEP 03',
    category: 'TARGETED SCAN MATCH',
    timeTag: 'Just now',
    title: 'Hyaluronic Acid Under-Eye Gel',
    description: 'Address micro-fatigue detected in peri-orbital telemetry scan.',
    chips: [
      { label: 'Scan Match: 96%', variant: 'purple' },
      { label: 'Tap gently', variant: 'sand' },
    ],
    isCompleted: true,
  },
  {
    id: 'step_4',
    stepNum: 'STEP 04',
    category: 'SHIELD & PROTECT',
    timeTag: 'Pending',
    title: 'Ceramide Barrier Moisturizer SPF 50+',
    description:
      'Dual-action protection: ceramides replenish hydration while broad-spectrum PA++++ blocks UV stress.',
    chips: [{ label: 'UV Shield SPF 50', variant: 'lavender' }],
    isCompleted: false,
    actionRequired: true,
    doseText: 'Nickel sized',
  },
];

const INITIAL_PM_STEPS: RegimenStepItem[] = [
  {
    id: 'pm_step_1',
    stepNum: 'STEP 01',
    category: 'DOUBLE CLEANSE',
    timeTag: '08:30 PM',
    title: 'Micellar Oil Balm & Gentle Wash',
    description: 'Dissolves daily sunscreen and environmental particulates completely.',
    chips: [{ label: 'Gentle Massage', variant: 'sand' }],
    isCompleted: false,
    actionRequired: true,
    doseText: 'Dime sized',
  },
  {
    id: 'pm_step_2',
    stepNum: 'STEP 02',
    category: 'CELLULAR RENEWAL',
    timeTag: '08:35 PM',
    title: 'Encapsulated Retinal 0.05% Emulsion',
    description: 'Promotes micro-collagen matrix synthesis without surface erythema.',
    chips: [{ label: '1 Pump', variant: 'purple' }],
    isCompleted: false,
  },
  {
    id: 'pm_step_3',
    stepNum: 'STEP 03',
    category: 'BARRIER LOCK',
    timeTag: '08:40 PM',
    title: 'Lipid Replenishing Night Recovery Cream',
    description: 'Fortifies transepidermal water barrier overnight during sleep cycles.',
    chips: [{ label: 'Night Lock', variant: 'lavender' }],
    isCompleted: false,
  },
];

export default function RoutineScreen() {
  const [activeTab, setActiveTab] = useState<'AM' | 'PM'>('AM');
  const [amSteps, setAmSteps] = useState<RegimenStepItem[]>(INITIAL_AM_STEPS);
  const [pmSteps, setPmSteps] = useState<RegimenStepItem[]>(INITIAL_PM_STEPS);

  const currentSteps = activeTab === 'AM' ? amSteps : pmSteps;
  const completedCount = currentSteps.filter(s => s.isCompleted).length;

  const handleToggleStep = (stepId: string) => {
    if (activeTab === 'AM') {
      setAmSteps(prev =>
        prev.map(step => (step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step)),
      );
    } else {
      setPmSteps(prev =>
        prev.map(step => (step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step)),
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Top Bar Header (Logo + Routine Label + Scan + Avatar) ── */}
        <RoutineHeader />

        {/* ── 1. 5-Day Glow Streak & Weekly Calendar ───────────── */}
        <StreakCalendarCard />

        {/* ── 2. Morning (AM) vs Evening (PM) Toggle Pill ──────── */}
        <View style={styles.toggleWrapper}>
          <View style={styles.toggleContainer}>
            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === 'AM' }}
              onPress={() => setActiveTab('AM')}
              style={[styles.toggleBtn, activeTab === 'AM' && styles.toggleBtnActive]}
            >
              <SunIcon size={16} color={activeTab === 'AM' ? '#FFFFFF' : '#475569'} />
              <AppText
                style={[styles.toggleBtnText, activeTab === 'AM' && styles.toggleBtnTextActive]}
              >
                Morning (AM)
              </AppText>
            </Pressable>

            <Pressable
              accessibilityRole="tab"
              accessibilityState={{ selected: activeTab === 'PM' }}
              onPress={() => setActiveTab('PM')}
              style={[styles.toggleBtn, activeTab === 'PM' && styles.toggleBtnActive]}
            >
              <MoonIcon size={16} color={activeTab === 'PM' ? '#FFFFFF' : '#475569'} />
              <AppText
                style={[styles.toggleBtnText, activeTab === 'PM' && styles.toggleBtnTextActive]}
              >
                Evening (PM)
              </AppText>
            </Pressable>
          </View>
        </View>

        {/* ── 3. Regimen Progress Card (3/4 Steps, 75%) ────────── */}
        <RegimenProgressCard completedSteps={completedCount} totalSteps={currentSteps.length} />

        {/* ── 4. Daily Regimen Flow Step Cards ─────────────────── */}
        <RegimenFlowList steps={currentSteps} onToggleStep={handleToggleStep} />

        {/* ── 5. Precision Recommendation ──────────────────────── */}
        <PrecisionRecommendationCard />

        {/* ── 6. Dermatology AI Insight Banner ─────────────────── */}
        <DermatologyInsightBanner />
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
    gap: Spacing.md,
  },
  toggleWrapper: {
    alignItems: 'center',
    marginVertical: 2,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.pill,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    width: '100%',
  },
  toggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: Radii.pill,
  },
  toggleBtnActive: {
    backgroundColor: '#0B132B',
  },
  toggleBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
