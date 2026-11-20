import React from 'react';
import { Pressable, StyleSheet, ActivityIndicator, ViewStyle, StyleProp, View } from 'react-native';
import { Radii, Spacing, Colors } from '@/constants/theme';
import { AppText } from './app-text';

const C = Colors.light;

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
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
  const getBg = (pressed: boolean) => {
    if (disabled) return '#E5EFEA';
    switch (variant) {
      case 'primary':
        return pressed ? '#145A3C' : C.primary;
      case 'secondary':
        return pressed ? '#D4EDE0' : C.secondary;
      case 'outline':
      case 'ghost':
        return pressed ? C.secondary : 'transparent';
      case 'danger':
        return pressed ? '#B91C1C' : '#DC2626';
      default:
        return C.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return C.textMuted;
    switch (variant) {
      case 'primary':
        return '#FFFFFF';
      case 'secondary':
        return C.primary;
      case 'outline':
      case 'ghost':
        return C.primary;
      case 'danger':
        return '#FFFFFF';
      default:
        return '#FFFFFF';
    }
  };

  const getBorderColor = () => {
    if (variant === 'outline') return disabled ? C.border : C.primary;
    return 'transparent';
  };

  const sizeStyle = {
    sm: { paddingVertical: 8, paddingHorizontal: Spacing.md },
    md: { paddingVertical: 13, paddingHorizontal: Spacing.lg },
    lg: { paddingVertical: 16, paddingHorizontal: Spacing.xl },
  }[size];

  const textVariant = size === 'sm' ? 'caption' : size === 'lg' ? 'h3' : 'body';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        sizeStyle,
        {
          backgroundColor: getBg(pressed),
          borderColor: getBorderColor(),
          borderWidth: variant === 'outline' ? 1.5 : 0,
          opacity: disabled ? 0.55 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.inner}>
          {icon}
          <AppText
            variant={textVariant as any}
            style={{ color: getTextColor(), fontWeight: '600' }}
          >
            {title}
          </AppText>
        </View>
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
    minHeight: 48,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
});
