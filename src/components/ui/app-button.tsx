import React from 'react';
import { Pressable, StyleSheet, ActivityIndicator, ViewStyle, StyleProp } from 'react-native';
import { Radii, Spacing } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';
import { AppText } from './app-text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
}: AppButtonProps) {
  const { colors } = useTheme();

  const getBackgroundColor = (pressed: boolean) => {
    if (disabled) return colors.border;
    switch (variant) {
      case 'primary':
        return pressed ? colors.primary + 'D9' : colors.primary;
      case 'secondary':
        return pressed ? colors.secondary + 'B3' : colors.secondary;
      case 'outline':
      case 'ghost':
        return pressed ? colors.secondary : 'transparent';
      default:
        return colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return colors.textMuted;
    switch (variant) {
      case 'primary':
        return colors.primaryForeground;
      case 'secondary':
        return colors.secondaryForeground;
      case 'outline':
      case 'ghost':
        return colors.primary;
      default:
        return colors.primaryForeground;
    }
  };

  const getBorderColor = () => {
    if (variant === 'outline') {
      return disabled ? colors.border : colors.primary;
    }
    return 'transparent';
  };

  const sizeStyles = {
    sm: { paddingVertical: Spacing.xs + 2, paddingHorizontal: Spacing.sm },
    md: { paddingVertical: Spacing.sm + 4, paddingHorizontal: Spacing.md },
    lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg },
  }[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        sizeStyles,
        {
          backgroundColor: getBackgroundColor(pressed),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1.5 : 0,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <>
          {icon}
          <AppText
            variant={size === 'sm' ? 'caption' : size === 'lg' ? 'h3' : 'body'}
            style={[styles.text, { color: getTextColor() }]}
          >
            {title}
          </AppText>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radii.md,
    gap: Spacing.sm,
    minHeight: 46,
  },
  text: {
    fontWeight: '600',
  },
});
