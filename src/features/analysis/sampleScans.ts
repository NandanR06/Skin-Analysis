import { CosmeticAnalysisRawInputs, generateCosmeticReport } from './cosmeticHeuristics';
import { ScanReport } from '../../types/scan';

export interface PresetFaceScan {
  id: string;
  name: string;
  description: string;
  mockInputs: CosmeticAnalysisRawInputs;
}

export const PRESET_FACE_SCANS: PresetFaceScan[] = [
  {
    id: 'preset_balanced',
    name: 'Balanced Skin (Optimal Light)',
    description: 'Even skin tone, low redness, moderate natural hydration radiance.',
    mockInputs: {
      quality: {
        status: 'good',
        lighting: 'good',
        blur: 'low',
        framing: 'centered',
        issues: [],
      },
      shineIndexForehead: 0.28,
      shineIndexCheeks: 0.22,
      rednessIndexCheeks: 0.18,
      rednessIndexNose: 0.22,
      textureVarianceCheeks: 0.24,
      textureVarianceForehead: 0.2,
      bilateralColorVariance: 0.19,
    },
  },
  {
    id: 'preset_oily_tzone',
    name: 'Oily T-Zone & Visible Pores',
    description: 'Elevated light reflection on forehead and nose, smooth cheeks.',
    mockInputs: {
      quality: {
        status: 'good',
        lighting: 'good',
        blur: 'low',
        framing: 'centered',
        issues: [],
      },
      shineIndexForehead: 0.74,
      shineIndexCheeks: 0.38,
      rednessIndexCheeks: 0.28,
      rednessIndexNose: 0.45,
      textureVarianceCheeks: 0.42,
      textureVarianceForehead: 0.62,
      bilateralColorVariance: 0.32,
    },
  },
  {
    id: 'preset_sensitive_redness',
    name: 'Sensitive & Cheeks Redness',
    description: 'Mild-to-prominent redness observed across cheekbones and bridge.',
    mockInputs: {
      quality: {
        status: 'good',
        lighting: 'good',
        blur: 'low',
        framing: 'centered',
        issues: [],
      },
      shineIndexForehead: 0.3,
      shineIndexCheeks: 0.25,
      rednessIndexCheeks: 0.68,
      rednessIndexNose: 0.52,
      textureVarianceCheeks: 0.46,
      textureVarianceForehead: 0.3,
      bilateralColorVariance: 0.45,
    },
  },
  {
    id: 'preset_dry_texture',
    name: 'Dry & Texture Focus',
    description: 'Minimal shine, subtle micro-texture variation, needs barrier hydration.',
    mockInputs: {
      quality: {
        status: 'acceptable',
        lighting: 'good',
        blur: 'low',
        framing: 'centered',
        issues: ['Subtle shadow detected around jawline'],
      },
      shineIndexForehead: 0.14,
      shineIndexCheeks: 0.12,
      rednessIndexCheeks: 0.32,
      rednessIndexNose: 0.28,
      textureVarianceCheeks: 0.64,
      textureVarianceForehead: 0.55,
      bilateralColorVariance: 0.38,
    },
  },
];

export function getPresetReport(presetId: string): ScanReport {
  const preset = PRESET_FACE_SCANS.find(p => p.id === presetId) ?? PRESET_FACE_SCANS[0];
  return generateCosmeticReport(preset.mockInputs);
}
