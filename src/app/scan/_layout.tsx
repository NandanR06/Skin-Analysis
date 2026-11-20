import React from 'react';
import { Stack } from 'expo-router';

/**
 * Nested layout for all scan-related screens.
 * Isolates camera presentation, animation gestures, and dynamic scan report routing.
 */
export default function ScanLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="camera"
        options={{
          presentation: 'fullScreenModal',
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="processing"
        options={{
          gestureEnabled: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="results"
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}
