import React from 'react';
import Svg, {
  Path,
  Circle,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  Polyline,
  Line,
} from 'react-native-svg';

export interface IconProps {
  size?: number;
  color?: string;
  secondaryColor?: string;
}

// ─── FaceScan AI Brand Mark ──────────────────────────────────────────────────
export function FaceScanLogo({ size = 32 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <Defs>
        <LinearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#4F46E5" />
          <Stop offset="100%" stopColor="#0B132B" />
        </LinearGradient>
      </Defs>
      <Rect width="32" height="32" rx="9" fill="url(#logoGrad)" />
      {/* Corner scan reticles */}
      <Path
        d="M7 11V8C7 7.44772 7.44772 7 8 7H11"
        stroke="#38BDF8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M25 11V8C25 7.44772 24.5523 7 24 7H21"
        stroke="#38BDF8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M7 21V24C7 24.5523 7.44772 25 8 25H11"
        stroke="#38BDF8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Path
        d="M25 21V24C25 24.5523 24.5523 25 24 25H21"
        stroke="#38BDF8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Biometric center face oval & scan beam */}
      <Circle cx="16" cy="16" r="5.5" stroke="#FFFFFF" strokeWidth="1.6" strokeDasharray="2 2" />
      <Circle cx="16" cy="16" r="2" fill="#38BDF8" />
    </Svg>
  );
}

// ─── Viewfinder Scanner Icon (Dark button & header button) ────────────────────
export function ScanViewfinderIcon({ size = 20, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Four corners */}
      <Path
        d="M4 8V5C4 4.44772 4.44772 4 5 4H8"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M20 8V5C20 4.44772 19.5523 4 19 4H16"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M4 16V19C4 19.5523 4.44772 20 5 20H8"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M20 16V19C20 19.5523 19.5523 20 19 20H16"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Center scan line / reticle */}
      <Line x1="7" y1="12" x2="17" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Circle cx="12" cy="12" r="1.5" fill={color} />
    </Svg>
  );
}

// ─── Shield Check Icon (Telemetry Active & Skin Barrier) ──────────────────────
export function ShieldCheckIcon({ size = 18, color = '#7C3AED' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22S4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 12L11 14L15 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Droplet Icon (Hydration) ─────────────────────────────────────────────────
export function DropletIcon({ size = 18, color = '#4F46E5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2.69L6.68 8.01C3.76 10.93 3.76 15.66 6.68 18.58C9.6 21.5 14.33 21.5 17.25 18.58C20.17 15.66 20.17 10.93 17.25 8.01L12 2.69Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.5 13C9.5 14.5 10.5 16 12 16"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
}

// ─── Sparkle Grid Icon (Smoothness) ───────────────────────────────────────────
export function SparkleGridIcon({ size = 18, color = '#64748B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="7" cy="7" r="2" fill={color} />
      <Circle cx="17" cy="7" r="2" fill={color} />
      <Circle cx="7" cy="17" r="2" fill={color} />
      <Circle cx="17" cy="17" r="2" fill={color} />
      <Circle cx="12" cy="12" r="2.5" fill={color} />
      <Path d="M12 4V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M12 17V20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M4 12H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <Path d="M17 12H20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Sebum Icon (Droplet / Flask / Lipid Balance) ─────────────────────────────
export function SebumIcon({ size = 18, color = '#7C3AED' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3L6.5 9.5C4.5 11.8 4.5 15.2 6.5 17.5C8.5 19.8 11.5 20.5 14 19.5C16.5 18.5 18 16.5 18 14C18 10.5 12 3 12 3Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 14H16"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
      <Circle cx="12" cy="15.5" r="1.5" fill={color} />
    </Svg>
  );
}

// ─── Sun Icon (UV Alert & Morning) ────────────────────────────────────────────
export function SunIcon({ size = 18, color = '#7C3AED' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="2" />
      <Path d="M12 2V4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M12 20V22" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M4.93 4.93L6.34 6.34" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M17.66 17.66L19.07 19.07" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M2 12H4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M20 12H22" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M4.93 19.07L6.34 17.66" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M17.66 6.34L19.07 4.93" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Moon Icon (Evening Routine) ──────────────────────────────────────────────
export function MoonIcon({ size = 18, color = '#4F46E5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Clock Icon (Reminder) ───────────────────────────────────────────────────
export function ClockIcon({ size = 14, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <Path
        d="M12 7V12L15 14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Trend Up Icon ───────────────────────────────────────────────────────────
export function TrendUpIcon({ size = 14, color = '#4F46E5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="23 6 13.5 15.5 8.5 10.5 1 18"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="17 6 23 6 23 12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Chevron Right ───────────────────────────────────────────────────────────
export function ChevronRightIcon({ size = 16, color = '#94A3B8' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Check Icon ──────────────────────────────────────────────────────────────
export function CheckIcon({ size = 14, color = '#10B981' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 6L9 17L4 12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Aperture / Sensor Icon ──────────────────────────────────────────────────
export function ApertureIcon({ size = 14, color = '#7C3AED' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <Line x1="14.31" y1="8" x2="20.05" y2="17.94" stroke={color} strokeWidth="1.8" />
      <Line x1="9.69" y1="8" x2="21.17" y2="8" stroke={color} strokeWidth="1.8" />
      <Line x1="7.38" y1="12" x2="13.12" y2="2.06" stroke={color} strokeWidth="1.8" />
      <Line x1="9.69" y1="16" x2="3.95" y2="6.06" stroke={color} strokeWidth="1.8" />
      <Line x1="14.31" y1="16" x2="2.83" y2="16" stroke={color} strokeWidth="1.8" />
      <Line x1="16.62" y1="12" x2="10.88" y2="21.94" stroke={color} strokeWidth="1.8" />
    </Svg>
  );
}

// ─── Home Tab Icon ───────────────────────────────────────────────────────────
export function HomeTabIcon({ size = 22, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.182V20C3 20.5523 3.44772 21 4 21H9C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21H20C20.5523 21 21 20.5523 21 20V10.182C21 9.77497 20.819 9.38914 20.5053 9.12767L12.5053 2.461C12.2144 2.21858 11.7856 2.21858 11.4947 2.461L3.49469 9.12767C3.18096 9.38914 3 9.77497 3 10.182Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Routine Tab Icon ────────────────────────────────────────────────────────
export function RoutineTabIcon({ size = 22, color = '#64748B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="4" width="18" height="18" rx="3" stroke={color} strokeWidth="2" />
      <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" />
      <Circle cx="8" cy="14" r="1.2" fill={color} />
      <Circle cx="12" cy="14" r="1.2" fill={color} />
      <Circle cx="16" cy="14" r="1.2" fill={color} />
      <Circle cx="8" cy="18" r="1.2" fill={color} />
      <Circle cx="12" cy="18" r="1.2" fill={color} />
    </Svg>
  );
}

// ─── Profile Tab Icon ────────────────────────────────────────────────────────
export function ProfileTabIcon({ size = 22, color = '#64748B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" />
    </Svg>
  );
}

// ─── Chevron Left (<) ────────────────────────────────────────────────────────
export function ChevronLeftIcon({ size = 20, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18L9 12L15 6"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Close Icon (✕) ──────────────────────────────────────────────────────────
export function CloseIcon({ size = 18, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 6L6 18M6 6L18 18"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Grid Dots / Matrix Icon ─────────────────────────────────────────────────
export function GridDotsIcon({ size = 18, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="4" y="4" width="4" height="4" rx="1" fill={color} />
      <Rect x="10" y="4" width="4" height="4" rx="1" fill={color} />
      <Rect x="16" y="4" width="4" height="4" rx="1" fill={color} />
      <Rect x="4" y="10" width="4" height="4" rx="1" fill={color} />
      <Rect x="10" y="10" width="4" height="4" rx="1" fill={color} />
      <Rect x="16" y="10" width="4" height="4" rx="1" fill={color} />
      <Rect x="4" y="16" width="4" height="4" rx="1" fill={color} />
      <Rect x="10" y="16" width="4" height="4" rx="1" fill={color} />
      <Rect x="16" y="16" width="4" height="4" rx="1" fill={color} />
    </Svg>
  );
}

// ─── Eye Icon (Fatigue Telemetry) ────────────────────────────────────────────
export function EyeIcon({ size = 14, color = '#4F46E5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
    </Svg>
  );
}

// ─── Derma-Light / Torch Icon ────────────────────────────────────────────────
export function DermaLightIcon({ size = 22, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 2H15V6L13 9V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V9L9 6V2Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <Line x1="12" y1="2" x2="12" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Path d="M6 3L4 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M18 3L20 2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Path d="M12 12V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Lens Flip / Switch Camera Icon ──────────────────────────────────────────
export function LensFlipIcon({ size = 22, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 7H16L14 4H10L8 7H4C2.89543 7 2 7.89543 2 9V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V9C22 7.89543 21.1046 7 20 7Z"
        stroke={color}
        strokeWidth="1.8"
      />
      <Path
        d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <Polyline
        points="15 10 15 12 13 12"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="9 16 9 14 11 14"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Ruler / Distance Tool Icon ──────────────────────────────────────────────
export function RulerIcon({ size = 14, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="1.8" />
      <Line x1="6" y1="6" x2="6" y2="11" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Line x1="10" y1="6" x2="10" y2="9" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Line x1="14" y1="6" x2="14" y2="11" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Line x1="18" y1="6" x2="18" y2="9" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Microchip / Neural Mesh Icon ────────────────────────────────────────────
export function CpuChipIcon({ size = 14, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="5" y="5" width="14" height="14" rx="2" stroke={color} strokeWidth="1.8" />
      <Rect x="9" y="9" width="6" height="6" stroke={color} strokeWidth="1.6" />
      <Line x1="9" y1="2" x2="9" y2="5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Line x1="15" y1="2" x2="15" y2="5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Line x1="9" y1="19" x2="9" y2="22" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Line
        x1="15"
        y1="19"
        x2="15"
        y2="22"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <Line x1="2" y1="9" x2="5" y2="9" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Line x1="2" y1="15" x2="5" y2="15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Line x1="19" y1="9" x2="22" y2="9" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Line
        x1="19"
        y1="15"
        x2="22"
        y2="15"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── Sparkle Wand Icon (Update Routine CTA) ──────────────────────────────────
export function SparkleWandIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 4V2M15 16V14M8 9H10M20 9H22M17.8 11.8L19.2 13.2M17.8 6.2L19.2 4.8M12.2 11.8L10.8 13.2M12.2 6.2L10.8 4.8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path d="M2 22L12 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Document / PDF Report Icon ──────────────────────────────────────────────
export function DocumentReportIcon({ size = 16, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14 2V8H20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1="16" y1="13" x2="8" y2="13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="16" y1="17" x2="8" y2="17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="10" y1="9" x2="8" y2="9" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Medical Clinic / Dermatologist Badge Icon ───────────────────────────────
export function ClinicBadgeIcon({ size = 18, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L3 7V12C3 17.5 7 21.5 12 22C17 21.5 21 17.5 21 12V7L12 2Z"
        fill="#0B132B"
        stroke="#0B132B"
        strokeWidth="1.5"
      />
      <Path d="M12 8V16M8 12H16" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Lightbulb Icon (Recommendation) ─────────────────────────────────────────
export function LightbulbIcon({ size = 16, color = '#4F46E5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18H15M10 21H14M12 2C8.13401 2 5 5.13401 5 9C5 11.38 6.19 13.47 8 14.74V16C8 16.55 8.45 17 9 17H15C15.55 17 16 16.55 16 16V14.74C17.81 13.47 19 11.38 19 9C19 5.13401 15.866 2 12 2Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Laser / Fine Lines Pen Tool Icon ────────────────────────────────────────
export function LaserToolIcon({ size = 18, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 2L22 6L8 20L4 21L5 17L18 2Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1="15" y1="5" x2="19" y2="9" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Circle cx="12" cy="12" r="1" fill={color} />
    </Svg>
  );
}

// ─── Flame / Streak Icon ─────────────────────────────────────────────────────
export function FlameIcon({ size = 18, color = '#D97706' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.5 14.5A3.5 3.5 0 0 0 12 18A3.5 3.5 0 0 0 15.5 14.5C15.5 12 12 9.5 12 9.5C12 9.5 8.5 12 8.5 14.5Z"
        fill={color}
      />
      <Path
        d="M12 2C9.5 5.5 6 9.5 6 14C6 17.31 8.69 20 12 20C15.31 20 18 17.31 18 14C18 9.5 14.5 5.5 12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Shopping Bag Icon ───────────────────────────────────────────────────────
export function ShoppingBagIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1="3" y1="6" x2="21" y2="6" stroke={color} strokeWidth="1.8" />
      <Path
        d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── Bookmark / Save Icon ────────────────────────────────────────────────────
export function BookmarkIcon({ size = 18, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Reorder List Icon ───────────────────────────────────────────────────────
export function ReorderIcon({ size = 14, color = '#475569' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="6" x2="20" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Line x1="4" y1="18" x2="20" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Settings Gear Icon ──────────────────────────────────────────────────────
export function SettingsGearIcon({ size = 18, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
      <Path
        d="M19.4 15A1.65 1.65 0 0 0 19.73 16.82L20.08 17.22A2 2 0 1 1 17.25 20.05L16.85 19.7A1.65 1.65 0 0 0 15 19.37A1.65 1.65 0 0 0 13.8 20.9V21.4A2 2 0 1 1 9.8 21.4V20.9A1.65 1.65 0 0 0 8.6 19.37A1.65 1.65 0 0 0 6.75 19.7L6.35 20.05A2 2 0 1 1 3.52 17.22L3.87 16.82A1.65 1.65 0 0 0 3.54 15A1.65 1.65 0 0 0 2 13.8H1.5A2 2 0 1 1 1.5 9.8H2A1.65 1.65 0 0 0 3.54 8.6A1.65 1.65 0 0 0 3.2 6.75L2.85 6.35A2 2 0 1 1 5.68 3.52L6.08 3.87A1.65 1.65 0 0 0 7.9 3.54A1.65 1.65 0 0 0 9.1 2V1.5A2 2 0 1 1 13.1 1.5V2A1.65 1.65 0 0 0 14.3 3.54A1.65 1.65 0 0 0 16.15 3.2L16.55 2.85A2 2 0 1 1 19.38 5.68L19.03 6.08A1.65 1.65 0 0 0 19.36 7.9A1.65 1.65 0 0 0 20.9 9.1H21.4A2 2 0 1 1 21.4 13.1H20.9A1.65 1.65 0 0 0 19.4 15Z"
        stroke={color}
        strokeWidth="1.8"
      />
    </Svg>
  );
}

// ─── Edit Pencil Icon ────────────────────────────────────────────────────────
export function EditPencilIcon({ size = 18, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 20H21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 3.5A2.121 2.121 0 0 1 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Verified Badge Icon (Next to name) ──────────────────────────────────────
export function VerifiedBadgeIcon({ size = 16, color = '#4F46E5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L15.09 3.26L18.16 4.79L19.59 7.77L21.09 10.71L20.48 13.97L19.78 17.21L17.21 19.38L14.47 21.32L11.23 21.39L8.01 21.19L5.59 19L3.4 16.64L3.15 13.39L3.12 10.13L4.93 7.35L6.96 4.74L10.11 3.73L12 2Z"
        fill={color}
      />
      <Path
        d="M9 12L11 14L15 10"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Battery / Power Icon ────────────────────────────────────────────────────
export function BatteryIcon({ size = 16, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="7" width="16" height="10" rx="2" stroke={color} strokeWidth="1.8" />
      <Path d="M20 11V13" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <Rect x="5" y="10" width="8" height="4" rx="1" fill="#10B981" />
    </Svg>
  );
}

// ─── Stethoscope / Care Team Icon ────────────────────────────────────────────
export function StethoscopeIcon({ size = 18, color = '#7C3AED' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 3V10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10V3"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M10 16V19C10 20.1046 10.8954 21 12 21H16C17.1046 21 18 20.1046 18 19V16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="18" cy="14" r="2.5" fill={color} />
      <Circle cx="4" cy="3" r="1.5" fill={color} />
      <Circle cx="16" cy="3" r="1.5" fill={color} />
    </Svg>
  );
}

// ─── Chat Bubble Icon ────────────────────────────────────────────────────────
export function ChatBubbleIcon({ size = 16, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15A2 2 0 0 1 19 17H7L3 21V5A2 2 0 0 1 5 3H19A2 2 0 0 1 21 5V15Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Bell Icon (Reminders) ───────────────────────────────────────────────────
export function BellIcon({ size = 18, color = '#4F46E5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 0 0 6 8C6 15 3 17 3 17H21S18 15 18 8Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21A2 2 0 0 1 10.27 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Heart Health Icon ───────────────────────────────────────────────────────
export function HeartIcon({ size = 18, color = '#DC2626' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.84 4.61A5.5 5.5 0 0 0 13.16 4.61L12 5.77L10.84 4.61A5.5 5.5 0 0 0 3.16 12.39L12 21.23L20.84 12.39A5.5 5.5 0 0 0 20.84 4.61Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Lock Shield Icon ────────────────────────────────────────────────────────
export function LockShieldIcon({ size = 18, color = '#4F46E5' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 22S4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect x="9" y="11" width="6" height="5" rx="1" fill={color} />
      <Path
        d="M10 11V9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9V11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// ─── Download Tray Icon ──────────────────────────────────────────────────────
export function DownloadIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 15V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="7 10 12 15 17 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1="12" y1="15" x2="12" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Log Out Icon ────────────────────────────────────────────────────────────
export function LogOutIcon({ size = 16, color = '#DC2626' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="16 17 21 12 16 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
}

// ─── Share / Export Arrow Icon ───────────────────────────────────────────────
export function ShareIcon({ size = 16, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="16 6 12 2 8 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1="12"
        y1="2"
        x2="12"
        y2="15"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// ─── Printer / Document Icon ─────────────────────────────────────────────────
export function PrinterIcon({ size = 16, color = '#0B132B' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline
        points="6 9 6 2 18 2 18 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Rect
        x="6"
        y="14"
        width="12"
        height="8"
        rx="1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
