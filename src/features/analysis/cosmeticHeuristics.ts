import {
  ScanReport,
  ImageQualityAssessment,
  FacialRegionKey,
  RegionCosmeticData,
  IndicatorLevel,
  RednessLevel,
  TextureLevel,
  ToneLevel,
} from '@/types/scan';

export interface CosmeticAnalysisRawInputs {
  imageUri?: string;
  quality: ImageQualityAssessment;
  // Region-specific heuristic measurements (0.0 to 1.0)
  shineIndexForehead: number;
  shineIndexCheeks: number;
  rednessIndexCheeks: number;
  rednessIndexNose: number;
  textureVarianceCheeks: number;
  textureVarianceForehead: number;
  bilateralColorVariance: number;
}

export function generateCosmeticReport(inputs: CosmeticAnalysisRawInputs): ScanReport {
  const getShineLevel = (val: number): IndicatorLevel => {
    if (val > 0.65) return 'elevated';
    if (val > 0.35) return 'moderate';
    return 'low';
  };

  const getRednessLevel = (val: number): RednessLevel => {
    if (val > 0.6) return 'prominent';
    if (val > 0.3) return 'mild';
    return 'minimal';
  };

  const getTextureLevel = (val: number): TextureLevel => {
    if (val > 0.65) return 'rough';
    if (val > 0.35) return 'moderate';
    return 'smooth';
  };

  const getToneLevel = (val: number): ToneLevel => {
    if (val > 0.55) return 'noticeable';
    if (val > 0.28) return 'slight_variation';
    return 'uniform';
  };

  const foreheadData: RegionCosmeticData = {
    shineEstimate: getShineLevel(inputs.shineIndexForehead),
    rednessAppearance: getRednessLevel(inputs.rednessIndexCheeks * 0.5),
    textureEstimate: getTextureLevel(inputs.textureVarianceForehead),
    unevenToneAppearance: getToneLevel(inputs.bilateralColorVariance * 0.7),
    confidence: inputs.quality.status === 'good' ? 'high' : 'medium',
    notes:
      inputs.shineIndexForehead > 0.5
        ? 'Slightly higher light reflectance observed in central forehead.'
        : 'Balanced appearance.',
  };

  const leftCheekData: RegionCosmeticData = {
    shineEstimate: getShineLevel(inputs.shineIndexCheeks),
    rednessAppearance: getRednessLevel(inputs.rednessIndexCheeks),
    textureEstimate: getTextureLevel(inputs.textureVarianceCheeks),
    unevenToneAppearance: getToneLevel(inputs.bilateralColorVariance),
    confidence: inputs.quality.status === 'good' ? 'high' : 'medium',
    notes:
      inputs.rednessIndexCheeks > 0.4
        ? 'Subtle warm color distribution observed on malar cheek region.'
        : 'Consistent tone.',
  };

  const rightCheekData: RegionCosmeticData = {
    shineEstimate: getShineLevel(inputs.shineIndexCheeks * 0.95),
    rednessAppearance: getRednessLevel(inputs.rednessIndexCheeks * 1.05),
    textureEstimate: getTextureLevel(inputs.textureVarianceCheeks),
    unevenToneAppearance: getToneLevel(inputs.bilateralColorVariance),
    confidence: inputs.quality.status === 'good' ? 'high' : 'medium',
    notes: 'Symmetric cheek observations compared to left region.',
  };

  const noseData: RegionCosmeticData = {
    shineEstimate: getShineLevel(inputs.shineIndexForehead * 1.1),
    rednessAppearance: getRednessLevel(inputs.rednessIndexNose),
    textureEstimate: getTextureLevel(inputs.textureVarianceForehead * 0.8),
    unevenToneAppearance: getToneLevel(inputs.bilateralColorVariance * 0.5),
    confidence: 'medium',
    notes: 'Central nasal bridge reflects higher specular light.',
  };

  const chinData: RegionCosmeticData = {
    shineEstimate: getShineLevel(inputs.shineIndexCheeks * 1.1),
    rednessAppearance: getRednessLevel(inputs.rednessIndexCheeks * 0.8),
    textureEstimate: getTextureLevel(inputs.textureVarianceCheeks * 0.9),
    unevenToneAppearance: getToneLevel(inputs.bilateralColorVariance * 0.8),
    confidence: 'medium',
    notes: 'Mental region exhibits uniform coloration.',
  };

  const underEyeData: RegionCosmeticData = {
    shineEstimate: 'low',
    rednessAppearance: 'minimal',
    textureEstimate: 'smooth',
    unevenToneAppearance: getToneLevel(inputs.bilateralColorVariance * 1.2),
    confidence: 'medium',
    notes:
      'Infraorbital darkness can be influenced by natural ocular anatomy and ambient lighting.',
  };

  const regions: Record<FacialRegionKey, RegionCosmeticData> = {
    forehead: foreheadData,
    leftCheek: leftCheekData,
    rightCheek: rightCheekData,
    nose: noseData,
    chin: chinData,
    underEye: underEyeData,
  };

  // Overall Clarity Score: 100 base minus variance penalties
  const overallClarity = Math.max(
    45,
    Math.min(
      96,
      Math.round(
        92 -
          inputs.rednessIndexCheeks * 20 -
          inputs.textureVarianceCheeks * 15 -
          inputs.bilateralColorVariance * 15,
      ),
    ),
  );

  const primaryConcern =
    inputs.rednessIndexCheeks > 0.5
      ? 'Redness Calming & Barrier Support'
      : inputs.shineIndexForehead > 0.6
        ? 'T-Zone Oil Balancing & Clarifying'
        : inputs.textureVarianceCheeks > 0.55
          ? 'Surface Smoothing & Texture Refinement'
          : 'Hydration & Daily Environmental Defense';

  return {
    scanId: `scan_${Date.now()}`,
    capturedAt: new Date().toISOString(),
    imageUri: inputs.imageUri,
    imageQuality: inputs.quality,
    overallScore: overallClarity,
    overallConfidence: inputs.quality.status === 'good' ? 'high' : 'medium',
    regions,
    summaryObservations: {
      primaryFocus: primaryConcern,
      shineOverall: getShineLevel((inputs.shineIndexForehead + inputs.shineIndexCheeks) / 2),
      rednessOverall: getRednessLevel(inputs.rednessIndexCheeks),
      textureOverall: getTextureLevel(inputs.textureVarianceCheeks),
      toneOverall: getToneLevel(inputs.bilateralColorVariance),
    },
    limitations: [
      'Image-based cosmetic estimate only; lighting and camera angles affect values.',
      'Sunscreen, cosmetic makeup, or ambient warmth can influence color measurements.',
      'Observations do not constitute clinical, diagnostic, or therapeutic assessments.',
    ],
    disclaimer:
      'This cosmetic analysis is intended for skincare education and routine guidance only. It is not a medical diagnosis and does not replace professional dermatological care.',
  };
}
