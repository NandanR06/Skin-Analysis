import React from 'react';
import { Text, TextProps } from 'react-native';
import { Typography, Colors } from '@/constants/theme';

const C = Colors.light;

export type TextVariant =
  'display' | 'h1' | 'h2' | 'h3' | 'bodyLarge' | 'body' | 'caption' | 'overline';

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
  const textColor = color ?? (muted ? C.textMuted : C.text);
  const typographyStyle = Typography[variant as keyof typeof Typography] ?? Typography.body;

  return (
    <Text style={[{ color: textColor }, typographyStyle, style]} {...rest}>
      {children}
    </Text>
  );
}
