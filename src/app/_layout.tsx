import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="scan/camera" options={{ presentation: 'fullScreenModal' }} />
      <Stack.Screen name="scan/processing" options={{ gestureEnabled: false }} />
      <Stack.Screen name="scan/results" />
      <Stack.Screen name="questionnaire" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
