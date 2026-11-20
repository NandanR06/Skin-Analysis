import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
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

let CameraViewComponent: any = null;
if (isNativeCameraAvailable) {
  try {
    const expoCamera = require('expo-camera');
    CameraViewComponent = expoCamera.CameraView;
  } catch {}
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

    if (!isNativeCameraAvailable || !CameraViewComponent) {
      // Native module not linked in current APK
      return <View style={style}>{children}</View>;
    }

    return (
      <CameraViewComponent ref={internalRef} facing={facing} style={style}>
        {children}
      </CameraViewComponent>
    );
  },
);

SafeCamera.displayName = 'SafeCamera';
