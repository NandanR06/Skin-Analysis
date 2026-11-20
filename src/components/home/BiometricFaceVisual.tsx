import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Svg, {
  Path,
  Circle,
  Rect,
  G,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Line,
  Text as SvgText,
} from 'react-native-svg';
import { AppText } from '@/components/ui';

interface BiometricFaceVisualProps {
  height?: number;
  variant?: 'hero' | 'thumbnail';
  score?: number;
  scanType?: string;
  style?: StyleProp<ViewStyle>;
}

export function BiometricFaceVisual({
  height = 190,
  variant = 'hero',
  score,
  scanType,
  style,
}: BiometricFaceVisualProps) {
  const isHero = variant === 'hero';

  return (
    <View style={[styles.container, { height }, style]}>
      {/* ── Background Svg Face Mesh & Cyber HUD ─────────────────────────────── */}
      <Svg width="100%" height="100%" viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice">
        <Defs>
          {/* Dark tech gradient background */}
          <LinearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="220" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#050C18" />
            <Stop offset="50%" stopColor="#0B1B2F" />
            <Stop offset="100%" stopColor="#040912" />
          </LinearGradient>

          {/* Cyan Glow */}
          <RadialGradient id="faceGlow" cx="200" cy="110" r="110" gradientUnits="userSpaceOnUse">
            <Stop offset="0%" stopColor="#0284C7" stopOpacity="0.45" />
            <Stop offset="60%" stopColor="#0369A1" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#0369A1" stopOpacity="0" />
          </RadialGradient>

          <RadialGradient
            id="centerHighlight"
            cx="200"
            cy="110"
            r="60"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* Background base */}
        <Rect width="400" height="220" fill="url(#bgGrad)" />

        {/* Ambient face illumination */}
        <Circle cx="200" cy="110" r="100" fill="url(#faceGlow)" />
        <Circle cx="200" cy="110" r="50" fill="url(#centerHighlight)" />

        {/* Subtle grid pattern background */}
        <G opacity="0.12" stroke="#38BDF8" strokeWidth="0.8">
          <Line x1="40" y1="0" x2="40" y2="220" strokeDasharray="3 3" />
          <Line x1="120" y1="0" x2="120" y2="220" strokeDasharray="3 3" />
          <Line x1="280" y1="0" x2="280" y2="220" strokeDasharray="3 3" />
          <Line x1="360" y1="0" x2="360" y2="220" strokeDasharray="3 3" />
          <Line x1="0" y1="50" x2="400" y2="50" strokeDasharray="3 3" />
          <Line x1="0" y1="110" x2="400" y2="110" strokeDasharray="3 3" />
          <Line x1="0" y1="170" x2="400" y2="170" strokeDasharray="3 3" />
        </G>

        {/* ── Realistic Stylized Face Silhouette ────────────────────────────── */}
        <G opacity="0.85">
          {/* Head & Neck Silhouette */}
          <Path
            d="M 160 215 C 160 185 155 170 148 150 C 138 125 138 88 152 60 C 165 35 182 25 200 25 C 218 25 235 35 248 60 C 262 88 262 125 252 150 C 245 170 240 185 240 215 Z"
            fill="#1E293B"
            stroke="#0284C7"
            strokeWidth="1.2"
            opacity="0.6"
          />

          {/* Shoulders */}
          <Path
            d="M 90 220 C 120 205 150 195 160 215 L 240 215 C 250 195 280 205 310 220 Z"
            fill="#0F172A"
            opacity="0.8"
          />
        </G>

        {/* ── Biometric Wireframe Face Mesh ─────────────────────────────────── */}
        <G stroke="#38BDF8" strokeWidth="1" opacity="0.9" fill="none">
          {/* Main Face Contour Oval */}
          <Path
            d="M 158 85 C 158 52 178 38 200 38 C 222 38 242 52 242 85 C 242 125 230 162 200 174 C 170 162 158 125 158 85 Z"
            stroke="#38BDF8"
            strokeWidth="1.6"
            strokeDasharray="4 2"
          />

          {/* Inner Cheeks & Jaw Structure */}
          <Path
            d="M 168 95 C 168 120 180 152 200 162 C 220 152 232 120 232 95"
            stroke="#60A5FA"
            opacity="0.75"
          />

          {/* Forehead horizontal scan arcs */}
          <Path d="M 170 60 Q 200 50 230 60" stroke="#06B6D4" opacity="0.8" />
          <Path d="M 166 75 Q 200 65 234 75" stroke="#06B6D4" opacity="0.8" />

          {/* Eyebrow & Eye Level Guides */}
          <Path d="M 172 88 Q 185 84 195 87" stroke="#38BDF8" strokeWidth="1.4" />
          <Path d="M 205 87 Q 215 84 228 88" stroke="#38BDF8" strokeWidth="1.4" />

          {/* Eye Target Rings */}
          <Circle cx="184" cy="95" r="7" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 1" />
          <Circle cx="184" cy="95" r="2.5" fill="#38BDF8" />
          <Circle cx="216" cy="95" r="7" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="2 1" />
          <Circle cx="216" cy="95" r="2.5" fill="#38BDF8" />

          {/* Nose Bridge & T-Zone Line */}
          <Line
            x1="200"
            y1="65"
            x2="200"
            y2="128"
            stroke="#38BDF8"
            strokeWidth="1.5"
            strokeDasharray="2 2"
          />
          <Path d="M 194 125 Q 200 130 206 125" stroke="#38BDF8" strokeWidth="1.5" />

          {/* Lips and Chin Landmark */}
          <Path d="M 188 142 Q 200 138 212 142" stroke="#60A5FA" strokeWidth="1.2" />
          <Path d="M 189 143 Q 200 148 211 143" stroke="#60A5FA" strokeWidth="1.2" />
          <Circle
            cx="200"
            cy="160"
            r="3"
            stroke="#38BDF8"
            strokeWidth="1.2"
            strokeDasharray="1 1"
          />

          {/* Facial Landmark Points */}
          <Circle cx="170" cy="60" r="1.8" fill="#38BDF8" />
          <Circle cx="200" cy="52" r="2" fill="#38BDF8" />
          <Circle cx="230" cy="60" r="1.8" fill="#38BDF8" />
          <Circle cx="160" cy="115" r="1.8" fill="#38BDF8" />
          <Circle cx="240" cy="115" r="1.8" fill="#38BDF8" />
          <Circle cx="178" cy="138" r="1.8" fill="#38BDF8" />
          <Circle cx="222" cy="138" r="1.8" fill="#38BDF8" />

          {/* Concentric Scan Target Circles */}
          <Circle
            cx="200"
            cy="110"
            r="75"
            stroke="#0284C7"
            strokeWidth="1"
            strokeDasharray="6 8"
            opacity="0.5"
          />
          <Circle
            cx="200"
            cy="110"
            r="88"
            stroke="#38BDF8"
            strokeWidth="0.8"
            strokeDasharray="3 15"
            opacity="0.3"
          />

          {/* Targeting Corner Brackets around Face */}
          <Path d="M 145 55 L 145 45 L 155 45" stroke="#38BDF8" strokeWidth="1.8" />
          <Path d="M 255 55 L 255 45 L 245 45" stroke="#38BDF8" strokeWidth="1.8" />
          <Path d="M 145 165 L 145 175 L 155 175" stroke="#38BDF8" strokeWidth="1.8" />
          <Path d="M 255 165 L 255 175 L 245 175" stroke="#38BDF8" strokeWidth="1.8" />
        </G>

        {/* ── Left HUD Telemetry Readouts ───────────────────────────────────── */}
        <G fill="#94A3B8">
          <SvgText x="18" y="38" fontSize="8" fontWeight="bold" fill="#38BDF8" letterSpacing="0.6">
            SKIN DIAGNOSTIC REPORT
          </SvgText>
          <Line x1="18" y1="44" x2="115" y2="44" stroke="#0284C7" strokeWidth="0.8" opacity="0.6" />

          <SvgText x="18" y="58" fontSize="7" fill="#64748B">
            HYDRATION INDEX
          </SvgText>
          <SvgText x="18" y="70" fontSize="10" fontWeight="bold" fill="#F8FAFC">
            92% Optimal
          </SvgText>

          <SvgText x="18" y="88" fontSize="7" fill="#64748B">
            PORE REFLECTANCE
          </SvgText>
          <SvgText x="18" y="100" fontSize="10" fontWeight="bold" fill="#38BDF8">
            0.18 Norm
          </SvgText>

          <SvgText x="18" y="118" fontSize="7" fill="#64748B">
            CAPTURE MODE
          </SvgText>
          <SvgText x="18" y="130" fontSize="9" fontWeight="600" fill="#94A3B8">
            Multispectral
          </SvgText>
        </G>

        {/* ── Right HUD Telemetry Readouts ──────────────────────────────────── */}
        <G fill="#94A3B8">
          <SvgText x="285" y="38" fontSize="8" fontWeight="bold" fill="#38BDF8" letterSpacing="0.6">
            FACIAL MAPPING
          </SvgText>
          <Line
            x1="285"
            y1="44"
            x2="382"
            y2="44"
            stroke="#0284C7"
            strokeWidth="0.8"
            opacity="0.6"
          />

          <SvgText x="285" y="58" fontSize="7" fill="#64748B">
            COMPLEXION
          </SvgText>
          <SvgText x="285" y="70" fontSize="10" fontWeight="bold" fill="#F8FAFC">
            Smooth · Clear
          </SvgText>

          <SvgText x="285" y="88" fontSize="7" fill="#64748B">
            LIPID BALANCE
          </SvgText>
          <SvgText x="285" y="100" fontSize="10" fontWeight="bold" fill="#38BDF8">
            84% Intact
          </SvgText>

          <SvgText x="285" y="118" fontSize="7" fill="#64748B">
            CALIBRATION
          </SvgText>
          <SvgText x="285" y="130" fontSize="9" fontWeight="600" fill="#94A3B8">
            36.6°C Ambient
          </SvgText>
        </G>
      </Svg>

      {/* ── Hero Overlay Badge: "• OPTICS CALIBRATED" ──────────────────────── */}
      {isHero && (
        <View style={styles.opticsBadge}>
          <View style={styles.blueDot} />
          <AppText style={styles.opticsText}>OPTICS CALIBRATED</AppText>
        </View>
      )}

      {/* ── Thumbnail Overlay: Score & Scan Type ───────────────────────────── */}
      {!isHero && (
        <>
          {score !== undefined && (
            <View style={styles.thumbScoreBadge}>
              <AppText style={styles.thumbScoreText}>{score}</AppText>
            </View>
          )}
          {scanType && (
            <View style={styles.thumbTypeBadge}>
              <AppText style={styles.thumbTypeText}>{scanType}</AppText>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#070F1D',
    position: 'relative',
    overflow: 'hidden',
  },
  opticsBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
  },
  opticsText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: 0.8,
  },
  thumbScoreBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#0B132B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    minWidth: 26,
    alignItems: 'center',
  },
  thumbScoreText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  thumbTypeBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  thumbTypeText: {
    color: '#0B132B',
    fontSize: 10,
    fontWeight: '700',
  },
});
