// ─── FaceScan AI Theme & Color Tokens ──────────────────────────────────────────
// Aesthetic: Clinical-luxury biometric wellness — warm ivory/sand background,
// obsidian navy primary elements, vibrant indigo/violet telemetry accents,
// soft lavender chips, and crisp white cards.

export const Colors = {
  light: {
    // Backgrounds
    background: '#FAF8F5', // Warm ivory/cream background from reference
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceTint: '#F3E8FF', // Soft lavender tint
    warmTint: '#FAF7F0', // Sand/warm cream subcard tint

    // Text hierarchy
    text: '#0B132B', // Deep obsidian navy for high-contrast headings
    textSecondary: '#64748B', // Slate grey for secondary labels & descriptions
    textMuted: '#94A3B8', // Muted slate

    // Brand & UI Accents
    primary: '#0B132B', // Deep obsidian navy button & dark elements
    primaryNavy: '#0B132B',
    primaryLight: '#EDE9FE',
    primaryForeground: '#FFFFFF',
    secondary: '#EEF2FF', // Soft indigo tint
    secondaryForeground: '#4F46E5',

    // Accents matching FaceScan AI telemetry
    accentIndigo: '#4F46E5',
    accentViolet: '#7C3AED',
    accentPurple: '#6366F1',
    accentBlue: '#3B82F6',
    accentCyan: '#06B6D4',
    badgeLavender: '#F3E8FF',
    badgeLavenderText: '#7C3AED',
    badgePurple: '#EDE9FE',
    badgePurpleText: '#6366F1',
    badgeGray: '#F1F5F9',
    badgeGrayText: '#475569',
    alertBg: '#FAF5FF',
    alertBorder: '#EDE9FE',

    // Botanical / Legacy aliases for compatibility
    accent: '#4F46E5',
    accentRose: '#D4635A',
    accentAmber: '#C87941',
    accentCyanLegacy: '#2B8C80',
    accentSage: '#7DAA94',

    // Surfaces & Borders
    border: '#F1EFEA',
    borderSubtle: '#F8F6F1',
    card: '#FFFFFF',
    cardBorder: '#F1EFEA',

    // Tab bar
    tint: '#0B132B',
    tabIconDefault: '#64748B',
    tabIconSelected: '#0B132B',
    tabActiveBg: '#EEF2FF',

    // Semantic
    success: '#10B981',
    warning: '#F59E0B',
    error: '#DC2626',
    info: '#3B82F6',
  },
} as const;

// Always use light colors — no dark mode
export const C = Colors.light;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
} as const;

export const Radii = {
  xs: 6,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 24,
  '2xl': 28,
  pill: 9999,
} as const;

export const Typography = {
  display: {
    fontSize: 30,
    fontWeight: '800' as const,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 18,
    fontWeight: '700' as const,
    lineHeight: 24,
  },
  h3: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 21,
  },
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 21,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  overline: {
    fontSize: 11,
    fontWeight: '700' as const,
    lineHeight: 14,
    letterSpacing: 1.2,
  },
} as const;

export const Shadow = {
  sm: {
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;
