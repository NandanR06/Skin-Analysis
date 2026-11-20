import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Ellipse, Line, Rect, Circle, Defs, Mask } from 'react-native-svg';
import { useTheme } from '@/hooks/use-theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export interface FaceGuideOverlayProps {
  status?: 'centered' | 'too_close' | 'too_far' | 'tilted';
  isLightingGood?: boolean;
}

export function FaceGuideOverlay({
  status = 'centered',
  isLightingGood = true,
}: FaceGuideOverlayProps) {
  const { colors } = useTheme();

  const getBorderColor = () => {
    if (!isLightingGood) return colors.warning;
    if (status === 'centered') return colors.success;
    return colors.warning;
  };

  const ovalX = SCREEN_WIDTH / 2;
  const ovalY = SCREEN_HEIGHT * 0.4;
  const radiusX = SCREEN_WIDTH * 0.35;
  const radiusY = SCREEN_HEIGHT * 0.24;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT}>
        <Defs>
          <Mask id="mask">
            {/* White covers entire screen */}
            <Rect x="0" y="0" width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill="white" />
            {/* Black oval cuts out the face viewport */}
            <Ellipse cx={ovalX} cy={ovalY} rx={radiusX} ry={radiusY} fill="black" />
          </Mask>
        </Defs>

        {/* Dark translucent backdrop around face */}
        <Rect
          x="0"
          y="0"
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fill="rgba(0,0,0,0.6)"
          mask="url(#mask)"
        />

        {/* Framing Oval Outline */}
        <Ellipse
          cx={ovalX}
          cy={ovalY}
          rx={radiusX}
          ry={radiusY}
          fill="transparent"
          stroke={getBorderColor()}
          strokeWidth="3"
          strokeDasharray="8,6"
        />

        {/* Landmark Center Crosshair Guides */}
        <Line
          x1={ovalX - 16}
          y1={ovalY}
          x2={ovalX + 16}
          y2={ovalY}
          stroke={getBorderColor()}
          strokeWidth="1.5"
          opacity={0.6}
        />
        <Line
          x1={ovalX}
          y1={ovalY - 16}
          x2={ovalX}
          y2={ovalY + 16}
          stroke={getBorderColor()}
          strokeWidth="1.5"
          opacity={0.6}
        />

        {/* Chin and Forehead anchor markers */}
        <Circle cx={ovalX} cy={ovalY - radiusY + 20} r="4" fill={getBorderColor()} opacity={0.7} />
        <Circle cx={ovalX} cy={ovalY + radiusY - 20} r="4" fill={getBorderColor()} opacity={0.7} />
      </Svg>
    </View>
  );
}
