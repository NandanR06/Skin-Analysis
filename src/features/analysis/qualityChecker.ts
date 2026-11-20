import { ImageQualityAssessment } from '@/types/scan';

export interface RawQualityInputs {
  faceDetected: boolean;
  faceCentered: boolean;
  averageLuminance?: number; // 0-255
  sharpnessScore?: number; // 0-100
  tiltAngleDegrees?: number;
}

export function evaluateScanQuality(inputs: RawQualityInputs): ImageQualityAssessment {
  const issues: string[] = [];

  if (!inputs.faceDetected) {
    issues.push('No face detected in camera viewport');
    return {
      status: 'needs_retake',
      lighting: 'good',
      blur: 'high',
      framing: 'too_far',
      issues,
    };
  }

  // Assess lighting
  let lighting: ImageQualityAssessment['lighting'] = 'good';
  const lum = inputs.averageLuminance ?? 128;
  if (lum < 50) {
    lighting = 'too_dark';
    issues.push('Environment is too dark. Move toward a window or softer front-facing light.');
  } else if (lum > 225) {
    lighting = 'overexposed';
    issues.push('Lighting is too bright or harsh. Avoid direct flash.');
  }

  // Assess blur / sharpness
  let blur: ImageQualityAssessment['blur'] = 'low';
  const sharpness = inputs.sharpnessScore ?? 75;
  if (sharpness < 40) {
    blur = 'high';
    issues.push('Camera movement detected. Hold the device steady for 1 second.');
  } else if (sharpness < 60) {
    blur = 'moderate';
  }

  // Assess framing
  let framing: ImageQualityAssessment['framing'] = 'centered';
  const tilt = Math.abs(inputs.tiltAngleDegrees ?? 0);
  if (!inputs.faceCentered) {
    framing = 'too_close';
    issues.push('Position your face completely within the oval guide.');
  } else if (tilt > 18) {
    framing = 'tilted';
    issues.push('Face the camera directly with a neutral, level posture.');
  }

  const hasCriticalIssue =
    lighting === 'too_dark' ||
    lighting === 'overexposed' ||
    blur === 'high' ||
    !inputs.faceCentered;
  const status: ImageQualityAssessment['status'] = hasCriticalIssue
    ? 'needs_retake'
    : issues.length > 0
      ? 'acceptable'
      : 'good';

  return {
    status,
    lighting,
    blur,
    framing,
    issues,
  };
}
