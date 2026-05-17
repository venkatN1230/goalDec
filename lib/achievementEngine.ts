/**
 * Achievement Tracking Engine
 * Calculates progress based on the measurement type.
 */

export type MeasureType = 'NUMERIC_MIN' | 'NUMERIC_MAX' | 'PERCENTAGE_MIN' | 'PERCENTAGE_MAX' | 'TIMELINE' | 'ZERO_BASED';

export function calculateProgress(
  type: MeasureType,
  target: number,
  achievement: number
): number {
  let progress = 0;

  switch (type) {
    case 'NUMERIC_MIN':
    case 'PERCENTAGE_MIN':
      // Min Type: Higher is better -> Achievement ÷ Target
      progress = target > 0 ? (achievement / target) * 100 : 0;
      break;

    case 'NUMERIC_MAX':
    case 'PERCENTAGE_MAX':
      // Max Type: Lower is better -> Target ÷ Achievement
      progress = achievement > 0 ? (target / achievement) * 100 : 0;
      // Handle edge case where achievement is 0 but lower is better
      if (achievement === 0) progress = 100;
      break;

    case 'TIMELINE':
      // Timeline: Date-based completion. Assumes target and achievement are timestamps or elapsed days
      progress = target > 0 ? (achievement / target) * 100 : 0;
      break;

    case 'ZERO_BASED':
      // Zero-based: If 0 → 100%, Else → 0%
      progress = achievement === 0 ? 100 : 0;
      break;

    default:
      progress = 0;
  }

  // Cap progress to 100% for standard tracking (optional configurable over-achievement)
  return Math.min(Math.max(progress, 0), 100);
}
