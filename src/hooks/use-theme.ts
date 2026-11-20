import { Colors } from '@/constants/theme';

// Always light mode — dark mode disabled app-wide
export function useTheme() {
  const colors = Colors.light;

  return {
    isDark: false,
    colors,
  };
}
