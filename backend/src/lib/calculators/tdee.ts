import type { ActivityLevel } from "./types.js";

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function calculateTdee(
  bmr: number,
  activityLevel: ActivityLevel,
): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}
