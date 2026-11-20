import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Ellipse, Line, Circle, Path, Defs, RadialGradient, Stop, G } from 'react-native-svg';
import { AppText } from '@/components/ui';
import { EyeIcon, ShieldCheckIcon, RulerIcon } from '@/components/ui/icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface LiveFaceScanOverlayProps {
  mode?: 'full' | 'acne' | 'lines';
  showMeshGrid?: boolean;
}

export function LiveFaceScanOverlay({
  mode = 'full',
  showMeshGrid = true,
}: LiveFaceScanOverlayProps) {
  // Center coordinates for face targeting
  const cx = SCREEN_WIDTH / 2;
  const cy = SCREEN_HEIGHT * 0.42;

  // Radii for face framing oval
  const rxOuter = SCREEN_WIDTH * 0.42;
  const ryOuter = SCREEN_HEIGHT * 0.28;
  const rxInner = SCREEN_WIDTH * 0.33;
  const ryInner = SCREEN_HEIGHT * 0.23;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      {/* ── Vector Biometric HUD & Target Geometry ─────────────────────────── */}
      <Svg width={SCREEN_WIDTH} height={SCREEN_HEIGHT} style={StyleSheet.absoluteFill}>
        <Defs>
          {/* Cyan Glow Gradient for Outer Ring */}
          <RadialGradient
            id="cyanRingGlow"
            cx={cx}
            cy={cy}
            r={rxOuter * 1.2}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="70%" stopColor="#38BDF8" stopOpacity="0.45" />
            <Stop offset="95%" stopColor="#06B6D4" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </RadialGradient>
        </Defs>

        {/* ── 1. Outer Cyan Glowing Halo Oval ───────────────────────────────── */}
        <Ellipse
          cx={cx}
          cy={cy}
          rx={rxOuter}
          ry={ryOuter}
          fill="none"
          stroke="#67E8F9"
          strokeWidth="3"
          strokeOpacity="0.75"
        />
        <Ellipse
          cx={cx}
          cy={cy}
          rx={rxOuter + 2}
          ry={ryOuter + 2}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="1.5"
          strokeOpacity="0.5"
        />

        {/* ── 2. Inner Navy Oval Frame ──────────────────────────────────────── */}
        <Ellipse
          cx={cx}
          cy={cy}
          rx={rxInner}
          ry={ryInner}
          fill="none"
          stroke="#0B132B"
          strokeWidth="2.5"
        />

        {/* ── 3. Concentric Dotted Guide Oval ───────────────────────────────── */}
        <Ellipse
          cx={cx}
          cy={cy}
          rx={rxInner - 8}
          ry={ryInner - 8}
          fill="none"
          stroke="#4F46E5"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          strokeOpacity="0.75"
        />

        {/* ── 4. Indigo Corner Framing Brackets [ ] ─────────────────────────── */}
        <G
          stroke="#4F46E5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          {/* Top-Left Bracket */}
          <Path
            d={`M ${cx - rxInner - 8} ${cy - ryInner + 28} V ${cy - ryInner - 4} H ${cx - rxInner + 28}`}
          />
          {/* Top-Right Bracket */}
          <Path
            d={`M ${cx + rxInner + 8} ${cy - ryInner + 28} V ${cy - ryInner - 4} H ${cx + rxInner - 28}`}
          />
          {/* Bottom-Left Bracket */}
          <Path
            d={`M ${cx - rxInner - 8} ${cy + ryInner - 28} V ${cy + ryInner + 4} H ${cx - rxInner + 28}`}
          />
          {/* Bottom-Right Bracket */}
          <Path
            d={`M ${cx + rxInner + 8} ${cy + ryInner - 28} V ${cy + ryInner + 4} H ${cx + rxInner - 28}`}
          />
        </G>

        {/* ── 5. Biometric Facial Landmark Constellation ────────────────────── */}
        {showMeshGrid && (
          <G opacity="0.85">
            {/* Forehead landmark cluster */}
            <Circle cx={cx} cy={cy - 95} r="2.5" fill="#3B82F6" />
            <Circle
              cx={cx}
              cy={cy - 70}
              r="4.5"
              fill="#3B82F6"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <Circle cx={cx - 30} cy={cy - 78} r="2" fill="#4F46E5" />
            <Circle cx={cx + 30} cy={cy - 78} r="2" fill="#4F46E5" />
            <Line
              x1={cx - 30}
              y1={cy - 78}
              x2={cx}
              y2={cy - 70}
              stroke="#818CF8"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <Line
              x1={cx + 30}
              y1={cy - 78}
              x2={cx}
              y2={cy - 70}
              stroke="#818CF8"
              strokeWidth="1"
              strokeDasharray="2 2"
            />

            {/* Horizontal eye-level guideline */}
            <Line
              x1={cx - 65}
              y1={cy - 45}
              x2={cx + 65}
              y2={cy - 45}
              stroke="#818CF8"
              strokeWidth="1"
              strokeDasharray="2 3"
            />
            {/* Pupils & temple landmarks */}
            <Circle cx={cx - 60} cy={cy - 25} r="2.5" fill="#3B82F6" />
            <Circle cx={cx + 35} cy={cy - 25} r="3" fill="#3B82F6" />

            {/* Nose bridge / T-Zone axis */}
            <Line
              x1={cx}
              y1={cy - 70}
              x2={cx}
              y2={cy + 30}
              stroke="#38BDF8"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <Circle cx={cx} cy={cy - 25} r="2.5" fill="#3B82F6" />
            <Circle cx={cx - 10} cy={cy - 15} r="1.8" fill="#4F46E5" />
            <Circle cx={cx} cy={cy - 10} r="3" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1" />
            <Circle cx={cx} cy={cy + 15} r="2.5" fill="#3B82F6" />

            {/* Chin alignment marker */}
            <Circle
              cx={cx}
              cy={cy + ryInner - 25}
              r="3.5"
              fill="#3B82F6"
              stroke="#FFFFFF"
              strokeWidth="1"
            />
          </G>
        )}
      </Svg>

      {/* ── 6. Dynamic Floating Telemetry Callout Pills ────────────────────── */}
      {/* (1) Forehead Pill: HYDRO: 68% OPTIMAL */}
      <View style={[styles.telemetryPill, { top: cy - ryInner - 12, left: cx - 74 }]}>
        <View style={styles.blueDot} />
        <View style={styles.pillTextCol}>
          <AppText style={styles.pillTextBold}>HYDRO: 68%</AppText>
          <AppText style={styles.pillTextSub}>OPTIMAL</AppText>
        </View>
      </View>

      {/* (2) Left Eye/Cheek Pill: 👁 FATIGUE: 12% */}
      <View style={[styles.telemetryPill, { top: cy - 35, left: cx - rxInner - 48 }]}>
        <EyeIcon size={14} color="#4F46E5" />
        <AppText style={styles.pillTextBold}>FATIGUE: 12%</AppText>
      </View>

      {/* (3) Right Cheek Pill: • SEBUM: NORMAL */}
      <View style={[styles.telemetryPill, { top: cy - 10, left: cx + 18 }]}>
        <View style={styles.blueDot} />
        <AppText style={styles.pillTextBold}>SEBUM: NORMAL</AppText>
      </View>

      {/* (4) Lower Left Jaw Pill: 🛡 BARRIER: 92/100 */}
      <View style={[styles.telemetryPill, { top: cy + ryInner - 55, left: cx - rxInner - 45 }]}>
        <ShieldCheckIcon size={14} color="#4F46E5" />
        <AppText style={styles.pillTextBold}>BARRIER: 92/100</AppText>
      </View>

      {/* (5) Bottom Chin Pill: 30 CM • 📐 PERFECT DISTANCE */}
      <View
        style={[
          styles.telemetryPill,
          styles.distancePill,
          { top: cy + ryInner - 14, left: cx - 68 },
        ]}
      >
        <AppText style={styles.pillTextBold}>30 CM •</AppText>
        <View style={styles.distanceInnerRow}>
          <RulerIcon size={13} color="#0B132B" />
          <AppText style={styles.distanceSubText}>PERFECT DISTANCE</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  telemetryPill: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F0',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    shadowColor: '#0B132B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  blueDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
  },
  pillTextCol: {
    alignItems: 'flex-start',
  },
  pillTextBold: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 0.2,
  },
  pillTextSub: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: 0.4,
  },
  distancePill: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  distanceInnerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 1,
  },
  distanceSubText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 0.6,
  },
});
