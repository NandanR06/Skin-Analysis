import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  Rect,
  Circle,
  Path,
  Line,
  G,
  Text as SvgText,
} from 'react-native-svg';
import { AppText } from '@/components/ui';
import { DropletIcon, ScanViewfinderIcon, ShieldCheckIcon, EyeIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';

type ZoneKey = 'A' | 'B' | 'C' | 'D';

interface ZoneData {
  key: ZoneKey;
  name: string;
  metric: string;
  subtext: string;
  statusTag: string;
  icon: React.ReactNode;
}

const ZONES: Record<ZoneKey, ZoneData> = {
  A: {
    key: 'A',
    name: 'Zone A: Forehead',
    metric: '94% Hydrated',
    subtext: '94% Moisture Retention • Balanced Sebum',
    statusTag: 'Hydrated',
    icon: <DropletIcon size={18} color="#0B132B" />,
  },
  B: {
    key: 'B',
    name: 'Zone B: Malar Cheek',
    metric: '89% Elasticity',
    subtext: '89% Elasticity • Firm Dermal Matrix',
    statusTag: 'Optimal',
    icon: <ShieldCheckIcon size={18} color="#0B132B" />,
  },
  C: {
    key: 'C',
    name: 'Zone C: Mandibular Jawline',
    metric: '91% Intact',
    subtext: '91% Barrier Integrity • Low Redness',
    statusTag: 'Intact',
    icon: <ShieldCheckIcon size={18} color="#0B132B" />,
  },
  D: {
    key: 'D',
    name: 'Zone D: Peri-Orbital Eye',
    metric: '68% Fatigue',
    subtext: '68% Fatigue • Micro-Dehydration Detected',
    statusTag: 'Attention',
    icon: <EyeIcon size={18} color="#0B132B" />,
  },
};

export function ZonalBiometricMap() {
  const [activeZone, setActiveZone] = useState<ZoneKey>('A');
  const zoneInfo = ZONES[activeZone];

  return (
    <View style={styles.section}>
      {/* ── Section Header ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <View style={styles.titleWrapper}>
          <AppText style={styles.watermarkText}>BIOMETRICS</AppText>
          <AppText variant="h2" style={styles.sectionTitle}>
            Zonal Biometric Mapping
          </AppText>
        </View>

        <View style={styles.hudBadge}>
          <AppText style={styles.hudBadgeText}>Interactive HUD</AppText>
        </View>
      </View>

      {/* ── Biometric Profile Map Graphic ──────────────────────── */}
      <View style={[styles.visualCard, Shadow.sm]}>
        <Svg width="100%" height={260} viewBox="0 0 340 260" preserveAspectRatio="xMidYMid slice">
          <Defs>
            <LinearGradient
              id="meshDarkBg"
              x1="0"
              y1="0"
              x2="0"
              y2="260"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#0B1626" />
              <Stop offset="50%" stopColor="#14243B" />
              <Stop offset="100%" stopColor="#09101C" />
            </LinearGradient>
            <RadialGradient
              id="profileGlow"
              cx="170"
              cy="130"
              r="130"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor="#38BDF8" stopOpacity="0.25" />
              <Stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </RadialGradient>
          </Defs>

          {/* Dark Cyber Mesh Background */}
          <Rect width="340" height="260" rx="16" fill="url(#meshDarkBg)" />
          <Rect width="340" height="260" rx="16" fill="url(#profileGlow)" />

          {/* Background Grid Pattern */}
          <G stroke="#38BDF8" strokeWidth="0.5" opacity="0.15">
            <Line x1="40" y1="0" x2="40" y2="260" strokeDasharray="3 3" />
            <Line x1="100" y1="0" x2="100" y2="260" strokeDasharray="3 3" />
            <Line x1="170" y1="0" x2="170" y2="260" strokeDasharray="3 3" />
            <Line x1="240" y1="0" x2="240" y2="260" strokeDasharray="3 3" />
            <Line x1="300" y1="0" x2="300" y2="260" strokeDasharray="3 3" />
            <Line x1="0" y1="65" x2="340" y2="65" strokeDasharray="3 3" />
            <Line x1="0" y1="130" x2="340" y2="130" strokeDasharray="3 3" />
            <Line x1="0" y1="195" x2="340" y2="195" strokeDasharray="3 3" />
          </G>

          {/* 3/4 Face Profile Contour Silhouette */}
          <Path
            d="M 120 70 C 135 60 160 55 180 65 C 205 75 225 105 225 140 C 225 180 200 220 180 240 L 150 260 L 120 260 C 110 240 100 210 100 185 C 95 160 90 145 105 130 C 115 120 110 95 120 70 Z"
            fill="#1E293B"
            stroke="#0284C7"
            strokeWidth="1.2"
            opacity="0.8"
          />

          {/* Facial Curve Contour Lines */}
          <Path
            d="M 135 90 C 145 80 170 80 185 95 C 200 110 205 140 195 170 C 185 195 160 215 145 220"
            stroke="#38BDF8"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />

          {/* Eye Axis Line */}
          <Line
            x1="70"
            y1="130"
            x2="270"
            y2="130"
            stroke="#818CF8"
            strokeWidth="0.8"
            strokeDasharray="3 3"
            opacity="0.6"
          />

          {/* Circular Targeting Halo */}
          <Circle
            cx="165"
            cy="135"
            r="75"
            stroke="#38BDF8"
            strokeWidth="1"
            strokeDasharray="5 5"
            fill="none"
            opacity="0.5"
          />

          {/* HUD Top-Left Indicator */}
          <Rect
            x="15"
            y="15"
            width="55"
            height="18"
            rx="4"
            fill="rgba(14, 165, 233, 0.2)"
            stroke="#38BDF8"
            strokeWidth="0.8"
          />
          <SvgText x="21" y="27" fontSize="7" fontWeight="bold" fill="#38BDF8" letterSpacing="0.8">
            BIOMETRICS
          </SvgText>
        </Svg>

        {/* ── Interactive Callout Nodes (A, B, C, D) ─────────────── */}
        {/* Node A (Forehead) */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Select Forehead Zone A"
          onPress={() => setActiveZone('A')}
          style={[
            styles.nodeBadge,
            { top: 38, left: 160 },
            activeZone === 'A' && styles.nodeBadgeActive,
          ]}
        >
          <AppText style={styles.nodeLetter}>A</AppText>
        </Pressable>
        <View style={[styles.nodeCalloutPill, { top: 18, left: 125 }]}>
          <AppText style={styles.nodeCalloutText}>94% Hydrated</AppText>
        </View>

        {/* Node D (Eye/Temple) */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Select Eye Zone D"
          onPress={() => setActiveZone('D')}
          style={[
            styles.nodeBadge,
            { top: 130, left: 85 },
            activeZone === 'D' && styles.nodeBadgeActive,
          ]}
        >
          <AppText style={styles.nodeLetter}>D</AppText>
        </Pressable>
        <View style={[styles.nodeCalloutPill, { top: 135, left: 45 }]}>
          <AppText style={styles.nodeCalloutText}>68% Fatigue</AppText>
        </View>

        {/* Node B (Cheek) */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Select Cheek Zone B"
          onPress={() => setActiveZone('B')}
          style={[
            styles.nodeBadge,
            { top: 130, left: 165 },
            activeZone === 'B' && styles.nodeBadgeActive,
          ]}
        >
          <AppText style={styles.nodeLetter}>B</AppText>
        </Pressable>
        <View style={[styles.nodeCalloutPill, { top: 130, left: 215 }]}>
          <AppText style={styles.nodeCalloutText}>89% Elasticity</AppText>
        </View>

        {/* Node C (Jawline) */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Select Jawline Zone C"
          onPress={() => setActiveZone('C')}
          style={[
            styles.nodeBadge,
            { top: 185, left: 235 },
            activeZone === 'C' && styles.nodeBadgeActive,
          ]}
        >
          <AppText style={styles.nodeLetter}>C</AppText>
        </Pressable>
      </View>

      {/* ── Selected Zone Details Sub-Card ─────────────────────── */}
      <View style={[styles.zoneDetailCard, Shadow.sm]}>
        <View style={styles.zoneIconBox}>{zoneInfo.icon}</View>

        <View style={styles.zoneTextCol}>
          <AppText style={styles.zoneNameText}>{zoneInfo.name}</AppText>
          <AppText style={styles.zoneSubText}>{zoneInfo.subtext}</AppText>
        </View>

        <View style={styles.zoneRightCol}>
          <View style={styles.statusPill}>
            <AppText style={styles.statusPillText}>{zoneInfo.statusTag}</AppText>
          </View>
          <ScanViewfinderIcon size={14} color="#94A3B8" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: Spacing.xs,
  },
  titleWrapper: {
    position: 'relative',
  },
  watermarkText: {
    fontSize: 16,
    fontWeight: '800',
    color: 'rgba(15, 23, 42, 0.14)',
    letterSpacing: 2,
    marginBottom: -4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.3,
  },
  hudBadge: {
    backgroundColor: '#FAF7F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  hudBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  visualCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1EFEA',
    position: 'relative',
    height: 260,
  },
  nodeBadge: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(79, 70, 229, 0.85)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  nodeBadgeActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#38BDF8',
    transform: [{ scale: 1.15 }],
  },
  nodeLetter: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  nodeCalloutPill: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.pill,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  nodeCalloutText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0B132B',
  },
  zoneDetailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.lg,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1EFEA',
    gap: 12,
  },
  zoneIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FAF7F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  zoneTextCol: {
    flex: 1,
    gap: 2,
  },
  zoneNameText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B132B',
  },
  zoneSubText: {
    fontSize: 12,
    color: '#64748B',
  },
  zoneRightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
});
