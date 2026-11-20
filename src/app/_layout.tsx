import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Root Layout
 * Responsible only for:
 * - Global providers (e.g. StatusBar, Theme)
 * - Automatic file-based route discovery (Expo Router discovers routes from directory structure)
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        {/* Modal presentation configured at the root modal level */}
        <Stack.Screen
          name="questionnaire"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
}
