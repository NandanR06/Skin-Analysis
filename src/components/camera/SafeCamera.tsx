import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { requireOptionalNativeModule } from 'expo-modules-core';

// Check if the native ExpoCamera module was compiled into this APK
export const isNativeCameraAvailable = Boolean(requireOptionalNativeModule('ExpoCamera'));

let useCameraPerms: () => [any, () => Promise<any>] = () => [
  { granted: false },
  async () => ({ granted: false }),
];

if (isNativeCameraAvailable) {
  try {
    const { useCameraPermissions } = require('expo-camera');
    useCameraPerms = useCameraPermissions;
  } catch {}
}

export const useSafeCameraPermissions = useCameraPerms;

export interface SafeCameraRef {
  takePictureAsync: (options?: { quality?: number }) => Promise<{ uri: string } | null>;
}

interface SafeCameraProps {
  facing: 'front' | 'back';
  style?: any;
  children?: React.ReactNode;
}

export const SafeCamera = forwardRef<SafeCameraRef, SafeCameraProps>(
  ({ facing, style, children }, ref) => {
    const internalRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      takePictureAsync: async options => {
        if (internalRef.current?.takePictureAsync) {
          return await internalRef.current.takePictureAsync(options);
        }
        return null;
      },
    }));

    if (!isNativeCameraAvailable) {
      // Native module not linked in current APK
      return <View style={style}>{children}</View>;
    }

    try {
      // Only require expo-camera if native module is confirmed present
      const { CameraView } = require('expo-camera');
      return (
        <CameraView ref={internalRef} facing={facing} style={style}>
          {children}
        </CameraView>
      );
    } catch (err) {
      console.warn('ExpoCamera failed to mount', err);
      return <View style={style}>{children}</View>;
    }
  },
);
