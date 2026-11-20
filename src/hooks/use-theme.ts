import { useColorScheme } from 'react-native';
import { Colors } from '../constants/theme';

export function useTheme() {
  const systemScheme = useColorScheme();
  const isDark = systemScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  return {
    isDark,
    colors,
  };
}
