import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AppText, AppButton, AppProgressBar } from '@/components/ui';
import { Spacing, Radii, Colors } from '@/constants/theme';
import { useProfileStore } from '@/store/useProfileStore';
import { SkinProfile } from '@/types/profile';

const C = Colors.light;

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
      { label: 'Minimal (3 essential steps)', value: 'minimal_3step' },
      { label: 'Balanced (4–5 steps with targeted treatment)', value: 'balanced_4to5step' },
      { label: 'Comprehensive (6+ steps multi-layered approach)', value: 'comprehensive' },
    ],
  },
];

export default function QuestionnaireScreen() {
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
      await updateProfile(answers);
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          style={styles.closeBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AppText variant="h2" color={C.textSecondary}>
            ✕
          </AppText>
        </Pressable>
        <AppText variant="h3">
          {currentIdx + 1} of {QUESTIONS.length}
        </AppText>
        <View style={{ width: 32 }} />
      </View>

      {/* Progress */}
      <AppProgressBar progress={progress} color={C.primary} height={4} style={styles.progressBar} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <View style={styles.questionBlock}>
          <AppText variant="overline" color={C.primary}>
            QUESTION {currentIdx + 1}
          </AppText>
          <AppText variant="h2" style={{ marginTop: Spacing.xs }}>
            {currentQ.title}
          </AppText>
          <AppText variant="body" color={C.textMuted} style={{ marginTop: 4 }}>
            {currentQ.subtitle}
          </AppText>
        </View>

        {/* Options */}
        <View style={styles.options}>
          {currentQ.options.map(opt => {
            const isSelected = selectedValue === opt.value;
            return (
              <Pressable
                key={opt.value}
                onPress={() => handleSelect(opt.value)}
                style={[
                  styles.optionCard,
                  {
                    borderColor: isSelected ? C.primary : C.border,
                    backgroundColor: isSelected ? C.secondary : '#FFFFFF',
                  },
                ]}
              >
                <View style={[styles.radio, { borderColor: isSelected ? C.primary : C.border }]}>
                  {isSelected && <View style={[styles.radioDot, { backgroundColor: C.primary }]} />}
                </View>
                <AppText
                  variant="body"
                  color={isSelected ? C.primary : C.text}
                  style={[styles.optLabel, isSelected && { fontWeight: '600' }]}
                >
                  {opt.label}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {currentIdx > 0 ? (
          <AppButton
            title="← Back"
            onPress={() => setCurrentIdx(i => i - 1)}
            variant="outline"
            size="md"
            style={{ flex: 1 }}
          />
        ) : null}
        <AppButton
          title={currentIdx === QUESTIONS.length - 1 ? 'Save Profile ✓' : 'Next →'}
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
  container: { flex: 1, backgroundColor: C.background },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  closeBtn: { padding: Spacing.xs },
  progressBar: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  scroll: {
    padding: Spacing.lg,
    gap: Spacing.lg,
    paddingBottom: 20,
  },
  questionBlock: { gap: 0 },
  options: { gap: Spacing.sm },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    gap: Spacing.md,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioDot: { width: 10, height: 10, borderRadius: 5 },
  optLabel: { flex: 1 },
  footer: {
    flexDirection: 'row',
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: C.border,
    backgroundColor: C.surface,
    gap: Spacing.sm,
  },
});
