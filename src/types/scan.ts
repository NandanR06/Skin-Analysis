export type QualityStatus = 'good' | 'acceptable' | 'needs_retake';

export interface ImageQualityAssessment {
  status: QualityStatus;
  lighting: 'good' | 'too_dark' | 'overexposed' | 'harsh_shadows';
  blur: 'low' | 'moderate' | 'high';
  framing: 'centered' | 'too_close' | 'too_far' | 'tilted';
  issues: string[];
}

export type IndicatorLevel = 'low' | 'moderate' | 'elevated';
export type RednessLevel = 'minimal' | 'mild' | 'prominent';
export type TextureLevel = 'smooth' | 'moderate' | 'rough';
export type ToneLevel = 'uniform' | 'slight_variation' | 'noticeable';

export interface RegionCosmeticData {
  shineEstimate: IndicatorLevel;
  rednessAppearance: RednessLevel;
  textureEstimate: TextureLevel;
  unevenToneAppearance: ToneLevel;
  confidence: 'high' | 'medium' | 'low';
  notes: string;
}

export type FacialRegionKey =
  'forehead' | 'leftCheek' | 'rightCheek' | 'nose' | 'chin' | 'underEye';

export interface ScanReport {
  scanId: string;
  capturedAt: string; // ISO 8601
  imageUri?: string;
  imageQuality: ImageQualityAssessment;
  overallScore: number; // 0-100 cosmetic skin clarity index
  overallConfidence: 'high' | 'medium' | 'low';
  regions: Record<FacialRegionKey, RegionCosmeticData>;
  summaryObservations: {
    primaryFocus: string;
    shineOverall: IndicatorLevel;
    rednessOverall: RednessLevel;
    textureOverall: TextureLevel;
    toneOverall: ToneLevel;
  };
  limitations: string[];
  disclaimer: string;
}
