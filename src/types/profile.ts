export type SkinFeel = 'tight_dry' | 'balanced' | 'oily_shiny' | 'combination_tzone' | 'not_sure';
export type FlakingFrequency = 'frequently' | 'occasionally' | 'rarely' | 'never';
export type BlemishFrequency = 'constant' | 'cyclical' | 'rare' | 'never';
export type SensitivityReaction =
  'very_sensitive' | 'moderately_sensitive' | 'rarely_sensitive' | 'resilient';
export type PrimaryConcern =
  | 'hydration'
  | 'oil_control'
  | 'redness_calming'
  | 'texture_smoothing'
  | 'tone_evenness'
  | 'aging_gracefully';

export interface SkinProfile {
  skinFeel: SkinFeel;
  flaking: FlakingFrequency;
  blemishes: BlemishFrequency;
  sensitivity: SensitivityReaction;
  primaryConcerns: PrimaryConcern[];
  allergiesOrSensitivities: string[];
  preferredRoutineLength: 'minimal_3step' | 'balanced_4to5step' | 'comprehensive';
  sunscreenDaily: boolean;
  completedAt?: string;
  hasConsentedToScan: boolean;
}
