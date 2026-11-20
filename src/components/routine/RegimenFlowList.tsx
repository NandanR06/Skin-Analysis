import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { AppText } from '@/components/ui';
import { CheckIcon, ReorderIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';

export interface RegimenStepItem {
  id: string;
  stepNum: string;
  category: string;
  timeTag: string;
  title: string;
  description: string;
  chips: { label: string; variant?: 'sand' | 'lavender' | 'purple' }[];
  isCompleted: boolean;
  actionRequired?: boolean;
  doseText?: string;
}

interface RegimenFlowListProps {
  steps: RegimenStepItem[];
  onToggleStep: (stepId: string) => void;
}

export function RegimenFlowList({ steps, onToggleStep }: RegimenFlowListProps) {
  return (
    <View style={styles.section}>
      {/* ── Section Header ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.titleRow}>
          <AppText variant="h2" style={styles.sectionTitle}>
            Daily Regimen Flow
          </AppText>
          <View style={styles.purpleDot} />
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Re-order routine steps"
          hitSlop={8}
          style={styles.reorderBtn}
        >
          <AppText style={styles.reorderText}>Re-order</AppText>
          <ReorderIcon size={14} color="#475569" />
        </Pressable>
      </View>

      {/* ── Steps List ─────────────────────────────────────────── */}
      <View style={styles.listCol}>
        {steps.map(step => (
          <View key={step.id} style={[styles.stepCard, Shadow.sm]}>
            {/* Top Row: Checkmark / Pending + Category + Timestamp */}
            <View style={styles.stepHeaderRow}>
              {/* Checkmark or Pending Indicator */}
              <Pressable
                onPress={() => onToggleStep(step.id)}
                hitSlop={8}
                style={[
                  styles.checkCircle,
                  step.isCompleted ? styles.checkCircleDone : styles.checkCirclePending,
                ]}
              >
                {step.isCompleted ? (
                  <CheckIcon size={12} color="#FFFFFF" />
                ) : (
                  <View style={styles.pendingInnerDot} />
                )}
              </Pressable>

              {/* Category */}
              <AppText style={styles.categoryText}>
                {step.stepNum} • {step.category}
              </AppText>

              {/* Time or Action Needed */}
              <AppText
                style={[
                  styles.timeTagText,
                  step.actionRequired && !step.isCompleted && styles.actionNeededText,
                ]}
              >
                {step.actionRequired && !step.isCompleted ? 'Action Needed' : step.timeTag}
              </AppText>
            </View>

            {/* Title & Description */}
            <AppText style={styles.stepTitle}>{step.title}</AppText>
            <AppText style={styles.stepDesc}>{step.description}</AppText>

            {/* Chips or Action Row */}
            <View style={styles.chipsAndActionRow}>
              <View style={styles.chipsRow}>
                {step.chips.map((chip, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.chipPill,
                      chip.variant === 'lavender' && styles.chipLavender,
                      chip.variant === 'purple' && styles.chipPurple,
                    ]}
                  >
                    <AppText
                      style={[
                        styles.chipText,
                        chip.variant === 'lavender' && styles.chipTextLavender,
                        chip.variant === 'purple' && styles.chipTextPurple,
                      ]}
                    >
                      {chip.label}
                    </AppText>
                  </View>
                ))}
              </View>

              {/* Action Needed Button (Mark Done) */}
              {step.actionRequired && !step.isCompleted && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Mark ${step.title} as done`}
                  onPress={() => onToggleStep(step.id)}
                  style={({ pressed }) => [styles.markDoneBtn, pressed && { opacity: 0.85 }]}
                >
                  <AppText style={styles.markDoneBtnText}>Mark Done ✓</AppText>
                </Pressable>
              )}
            </View>

            {/* Dose text if available */}
            {step.doseText && !step.isCompleted && (
              <AppText style={styles.doseText}>Dose: {step.doseText}</AppText>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.3,
  },
  purpleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366F1',
  },
  reorderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reorderText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  listCol: {
    gap: 12,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#F1EFEA',
    gap: 8,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleDone: {
    backgroundColor: '#0B132B',
  },
  checkCirclePending: {
    borderWidth: 2,
    borderColor: '#0B132B',
    backgroundColor: '#FFFFFF',
  },
  pendingInnerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0B132B',
  },
  categoryText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6366F1',
    letterSpacing: 0.6,
    flex: 1,
  },
  timeTagText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  actionNeededText: {
    color: '#D97706',
    fontWeight: '700',
  },
  stepTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.2,
  },
  stepDesc: {
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 18,
  },
  chipsAndActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 2,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    flex: 1,
  },
  chipPill: {
    backgroundColor: '#FAF7F0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  chipLavender: {
    backgroundColor: '#F3E8FF',
  },
  chipPurple: {
    backgroundColor: '#EDE9FE',
  },
  chipText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  chipTextLavender: {
    color: '#7C3AED',
    fontWeight: '700',
  },
  chipTextPurple: {
    color: '#4F46E5',
    fontWeight: '700',
  },
  markDoneBtn: {
    backgroundColor: '#0B132B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.pill,
  },
  markDoneBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '700',
  },
  doseText: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '500',
  },
});
