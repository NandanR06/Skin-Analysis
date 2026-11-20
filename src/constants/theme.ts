export const Colors = {
  light: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    text: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    primary: '#1E6F5C', // Calming botanical green (skincare aesthetic)
    primaryForeground: '#FFFFFF',
    secondary: '#E8F1EE',
    secondaryForeground: '#1E6F5C',
    accent: '#289672',
    accentRose: '#E07A5F', // For redness indicator
    accentAmber: '#E76F51', // For warm/glow indicator
    accentCyan: '#2A9D8F', // For hydration indicator
    border: '#E5E7EB',
    card: '#FFFFFF',
    cardBorder: '#EEF2F6',
    tint: '#1E6F5C',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#1E6F5C',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
  dark: {
    background: '#0D1317',
    surface: '#151F24',
    surfaceElevated: '#1D2A32',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
    primary: '#289672',
    primaryForeground: '#FFFFFF',
    secondary: '#1A2E27',
    secondaryForeground: '#52B788',
    accent: '#52B788',
    accentRose: '#E07A5F',
    accentAmber: '#F4A261',
    accentCyan: '#48CAE4',
    border: '#2A3B45',
    card: '#151F24',
    cardBorder: '#23323B',
    tint: '#52B788',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#52B788',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 9999,
} as const;

export const Typography = {
  display: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
  },
  h1: {
    fontSize: 22,
    fontWeight: '700' as const,
    lineHeight: 28,
  },
  h2: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  h3: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
} as const;
