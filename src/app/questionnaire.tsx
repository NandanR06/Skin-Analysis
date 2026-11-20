import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppText, AppButton, AppCard, AppProgressBar } from '../components/ui';
import { useTheme } from '../hooks/use-theme';
import { Spacing, Radii } from '../constants/theme';
import { useProfileStore } from '../store/useProfileStore';
import { SkinProfile } from '../types/profile';

interface Question {
  id: keyof SkinProfile;
  title: string;
  subtitle: string;
  options: { label: string; value: any }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'skinFeel',
    title: 'How does your skin feel a few hours after cleansing?',
    subtitle: 'Without applying any moisturizer or sunscreen.',
    options: [
      { label: 'Tight, dry, or uncomfortable', value: 'tight_dry' },
      { label: 'Comfortable, neither dry nor oily', value: 'balanced' },
      { label: 'Shiny or slick all over', value: 'oily_shiny' },
      { label: 'Oily on forehead/nose, normal on cheeks', value: 'combination_tzone' },
      { label: 'Not sure / changes day to day', value: 'not_sure' },
    ],
  },
  {
    id: 'flaking',
    title: 'Do you experience visible flaking or tightness?',
    subtitle: 'Especially after washing or during cold weather.',
    options: [
      { label: 'Frequently', value: 'frequently' },
      { label: 'Occasionally', value: 'occasionally' },
      { label: 'Rarely', value: 'rarely' },
      { label: 'Never', value: 'never' },
    ],
  },
  {
    id: 'blemishes',
    title: 'How often do you notice blemishes or clogged pores?',
    subtitle: 'Helps customize clarifying vs soothing active steps.',
    options: [
      { label: 'Constantly / persistent breakouts', value: 'constant' },
      { label: 'Cyclical / during stress or hormone changes', value: 'cyclical' },
      { label: 'Rarely / isolated spots', value: 'rare' },
      { label: 'Never', value: 'never' },
    ],
  },
  {
    id: 'sensitivity',
    title: 'Does your skin react easily to new products or fragrance?',
    subtitle: 'Such as redness, stinging, warmth, or itching.',
    options: [
      { label: 'Very sensitive (reacts frequently)', value: 'very_sensitive' },
      {
        label: 'Moderately sensitive (requires careful patch testing)',
        value: 'moderately_sensitive',
      },
      { label: 'Rarely sensitive (well tolerated)', value: 'rarely_sensitive' },
      { label: 'Resilient (rarely reacts to any formula)', value: 'resilient' },
    ],
  },
  {
    id: 'preferredRoutineLength',
    title: 'What is your preferred daily routine commitment?',
    subtitle: 'We tailor the number of steps to match your lifestyle.',
    options: [
      { label: 'Minimal (3 essential steps: Cleanse, Hydrate, Protect)', value: 'minimal_3step' },
      { label: 'Balanced (4-5 steps with targeted active treatment)', value: 'balanced_4to5step' },
      { label: 'Comprehensive (6+ steps multi-layered approach)', value: 'comprehensive' },
    ],
  },
];

export default function QuestionnaireScreen() {
  const { colors } = useTheme();
  const { profile, updateProfile } = useProfileStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Partial<SkinProfile>>(profile);

  const currentQ = QUESTIONS[currentIdx];
  const progress = (currentIdx + 1) / QUESTIONS.length;
  const selectedValue = answers[currentQ.id];

  const handleSelect = (val: any) => {
    setAnswers((prev: Partial<SkinProfile>) => ({ ...prev, [currentQ.id]: val }));
  };

  const handleNext = async () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(i => i + 1);
    } else {
      // Save completed profile
      await updateProfile(answers);
      router.back();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.closeBtn}>
          <AppText variant="h2">✕</AppText>
        </Pressable>
        <AppText variant="h3">
          Question {currentIdx + 1} of {QUESTIONS.length}
        </AppText>
        <View style={{ width: 32 }} />
      </View>

      <AppProgressBar
        progress={progress}
        color={colors.primary}
        height={4}
        style={{ marginBottom: Spacing.md }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.questionHeader}>
          <AppText variant="h1">{currentQ.title}</AppText>
          <AppText variant="body" muted>
            {currentQ.subtitle}
          </AppText>
        </View>

        <View style={styles.optionsList}>
          {currentQ.options.map(opt => {
            const isSelected = selectedValue === opt.value;
            return (
              <Pressable
                key={opt.value}
                onPress={() => handleSelect(opt.value)}
                style={[
                  styles.optionCard,
                  {
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: isSelected ? colors.secondary : colors.surface,
                  },
                ]}
              >
                <View
                  style={[
                    styles.radioCircle,
                    {
                      borderColor: isSelected ? colors.primary : colors.border,
                    },
                  ]}
                >
                  {isSelected ? (
                    <View style={[styles.radioDot, { backgroundColor: colors.primary }]} />
                  ) : null}
                </View>
                <AppText
                  variant="body"
                  color={isSelected ? colors.primary : colors.text}
                  style={[styles.optionLabel, isSelected && { fontWeight: '600' }]}
                >
                  {opt.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View
        style={[styles.footer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}
      >
        {currentIdx > 0 ? (
          <AppButton
            title="Back"
            onPress={() => setCurrentIdx(i => i - 1)}
            variant="outline"
            size="md"
            style={{ flex: 1 }}
          />
        ) : null}
        <AppButton
          title={currentIdx === QUESTIONS.length - 1 ? 'Save Profile' : 'Next Question'}
          onPress={handleNext}
          disabled={!selectedValue}
          variant="primary"
          size="md"
          style={{ flex: 2 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  closeBtn: {
    padding: Spacing.xs,
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.lg,
  },
  questionHeader: {
    gap: Spacing.xs,
  },
  optionsList: {
    gap: Spacing.sm,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    gap: Spacing.md,
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  optionLabel: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: Spacing.md,
    borderTopWidth: 1,
    gap: Spacing.sm,
  },
});
