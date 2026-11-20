import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Ellipse,
  Path,
  Circle,
} from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export function SimulatedFaceView() {
  const cx = SCREEN_WIDTH / 2;
  const cy = SCREEN_HEIGHT * 0.42;

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          {/* Natural Studio Light Ambient Backdrop */}
          <LinearGradient id="studioBg" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#8A8275" />
            <Stop offset="35%" stopColor="#A89E90" />
            <Stop offset="65%" stopColor="#9C9283" />
            <Stop offset="100%" stopColor="#787062" />
          </LinearGradient>

          {/* Key Light Glow on Face */}
          <RadialGradient
            id="keyLight"
            cx={cx}
            cy={cy}
            r={SCREEN_WIDTH * 0.55}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#FDE6D2" stopOpacity="0.9" />
            <Stop offset="40%" stopColor="#EBCDB5" stopOpacity="0.7" />
            <Stop offset="75%" stopColor="#C9A88F" stopOpacity="0.4" />
            <Stop offset="100%" stopColor="#9C9283" stopOpacity="0" />
          </RadialGradient>

          {/* Hair Gradient */}
          <LinearGradient id="hairDark" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#2E1C12" />
            <Stop offset="50%" stopColor="#3D2619" />
            <Stop offset="100%" stopColor="#1C100A" />
          </LinearGradient>

          {/* Skin Tone Gradient */}
          <RadialGradient id="skinTone" cx={cx} cy={cy - 10} r="140" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#FBE9DB" />
            <Stop offset="50%" stopColor="#F5D8C3" />
            <Stop offset="85%" stopColor="#E7C0A7" />
            <Stop offset="100%" stopColor="#D5A98D" />
          </RadialGradient>
        </Defs>

        {/* Ambient Room Lighting */}
        <Rect width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill="url(#studioBg)" />
        <Rect width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill="url(#keyLight)" />

        {/* ── Realistic Stylized Portrait Silhouette ────────────────────────── */}
        {/* Hair Back */}
        <Ellipse cx={cx} cy={cy - 30} rx={135} ry={170} fill="url(#hairDark)" />

        {/* Shoulders & Neck */}
        <Path
          d={`M ${cx - 45} ${cy + 130} C ${cx - 45} ${cy + 180} ${cx - 150} ${cy + 220} ${cx - 200} ${SCREEN_HEIGHT} L ${cx + 200} ${SCREEN_HEIGHT} C ${cx + 150} ${cy + 220} ${cx + 45} ${cy + 180} ${cx + 45} ${cy + 130} Z`}
          fill="#E7C0A7"
        />

        {/* Main Face Contour */}
        <Path
          d={`M ${cx - 105} ${cy - 40} C ${cx - 105} ${cy - 145} ${cx - 65} ${cy - 175} ${cx} ${cy - 175} C ${cx + 65} ${cy - 175} ${cx + 105} ${cy - 145} ${cx + 105} ${cy - 40} C ${cx + 105} ${cy + 45} ${cx + 70} ${cy + 125} ${cx} ${cy + 145} C ${cx - 70} ${cy + 125} ${cx - 105} ${cy + 45} ${cx - 105} ${cy - 40} Z`}
          fill="url(#skinTone)"
        />

        {/* Hair Framing */}
        <Path
          d={`M ${cx - 110} ${cy - 50} C ${cx - 110} ${cy - 180} ${cx - 30} ${cy - 195} ${cx} ${cy - 180} C ${cx + 30} ${cy - 195} ${cx + 110} ${cy - 180} ${cx + 110} ${cy - 50} C ${cx + 90} ${cy - 120} ${cx + 50} ${cy - 130} ${cx} ${cy - 130} C ${cx - 50} ${cy - 130} ${cx - 90} ${cy - 120} ${cx - 110} ${cy - 50} Z`}
          fill="url(#hairDark)"
        />

        {/* Eyebrows */}
        <Path
          d={`M ${cx - 68} ${cy - 48} Q ${cx - 42} ${cy - 60} ${cx - 18} ${cy - 48}`}
          stroke="#3D2619"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <Path
          d={`M ${cx + 18} ${cy - 48} Q ${cx + 42} ${cy - 60} ${cx + 68} ${cy - 48}`}
          stroke="#3D2619"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Eyes */}
        <Ellipse cx={cx - 42} cy={cy - 30} rx={18} ry={10} fill="#FFFFFF" />
        <Circle cx={cx - 42} cy={cy - 30} r="7" fill="#4A3324" />
        <Circle cx={cx - 40} cy={cy - 32} r="2.5" fill="#FFFFFF" />

        <Ellipse cx={cx + 42} cy={cy - 30} rx={18} ry={10} fill="#FFFFFF" />
        <Circle cx={cx + 42} cy={cy - 30} r="7" fill="#4A3324" />
        <Circle cx={cx + 44} cy={cy - 32} r="2.5" fill="#FFFFFF" />

        {/* Nose Contour */}
        <Path
          d={`M ${cx} ${cy - 35} L ${cx - 3} ${cy + 18} Q ${cx} ${cy + 24} ${cx + 8} ${cy + 22}`}
          stroke="#C9A28B"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <Circle cx={cx - 10} cy={cy + 22} r="3" fill="#B88E75" opacity="0.4" />
        <Circle cx={cx + 12} cy={cy + 22} r="3" fill="#B88E75" opacity="0.4" />

        {/* Lips */}
        <Path
          d={`M ${cx - 28} ${cy + 64} Q ${cx} ${cy + 55} ${cx + 28} ${cy + 64} Q ${cx} ${cy + 82} ${cx - 28} ${cy + 64} Z`}
          fill="#CB8378"
        />
        <Path
          d={`M ${cx - 26} ${cy + 64} Q ${cx} ${cy + 67} ${cx + 26} ${cy + 64}`}
          stroke="#A75D53"
          strokeWidth="1.5"
          fill="none"
        />
      </Svg>
    </View>
  );
}
