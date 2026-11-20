// ─── Light-only palette — dark mode is intentionally disabled ───────────────
// Aesthetic: Clean clinical-spa — white surfaces, sage green accents,
// warm rose/amber indicators, generous whitespace.

export const Colors = {
  light: {
    // Backgrounds
    background: '#F7F9F8', // Very light sage tint
    surface: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceTint: '#EEF5F1', // Subtle green tint for section backgrounds

    // Text hierarchy
    text: '#0F2419', // Deep forest — highest contrast
    textSecondary: '#4A6358', // Sage-tinted grey
    textMuted: '#8FA89E', // Muted green-grey

    // Brand greens
    primary: '#1A6B4A', // Deep botanical green
    primaryLight: '#D4EDE0', // Very light green for tinted surfaces
    primaryForeground: '#FFFFFF',
    secondary: '#E8F4ED', // Soft mint card background
    secondaryForeground: '#1A6B4A',

    // Accents
    accent: '#24936A',
    accentRose: '#D4635A', // Redness indicator
    accentAmber: '#C87941', // Glow / warmth indicator
    accentCyan: '#2B8C80', // Hydration indicator
    accentSage: '#7DAA94', // Softer green for decorative elements

    // Surfaces & Borders
    border: '#DDE9E3',
    borderSubtle: '#EEF5F1',
    card: '#FFFFFF',
    cardBorder: '#E5EFEA',

    // Tab bar
    tint: '#1A6B4A',
    tabIconDefault: '#A0BAB1',
    tabIconSelected: '#1A6B4A',

    // Semantic
    success: '#1A9E6A',
    warning: '#D97706',
    error: '#DC2626',
    info: '#0C7ABF',
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
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
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
    fontWeight: '600' as const,
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
    shadowColor: '#0F2419',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#0F2419',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#0F2419',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;
