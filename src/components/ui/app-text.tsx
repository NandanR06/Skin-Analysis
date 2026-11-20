import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { Typography } from '../../constants/theme';
import { useTheme } from '../../hooks/use-theme';

export type TextVariant = 'display' | 'h1' | 'h2' | 'h3' | 'bodyLarge' | 'body' | 'caption';

export interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  muted?: boolean;
}

export function AppText({
  variant = 'body',
  color,
  muted = false,
  style,
  children,
  ...rest
}: AppTextProps) {
  const { colors } = useTheme();

  const textColor = color ?? (muted ? colors.textSecondary : colors.text);
  const typographyStyle = Typography[variant];

  return (
    <Text style={[{ color: textColor }, typographyStyle, style]} {...rest}>
      {children}
    </Text>
  );
}
