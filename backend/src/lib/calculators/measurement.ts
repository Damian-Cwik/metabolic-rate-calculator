import { calculateBmi, classifyBmi } from "./bmi.js";
import { calculateBmr } from "./bmr.js";
import { calculateTdee } from "./tdee.js";
import type { BodyData, CalculationResult } from "./types.js";

export function calculateMeasurementResult(body: BodyData): CalculationResult {
  const bmi = calculateBmi(body.weightKg, body.heightCm);
  const bmr = calculateBmr(body);
  const tdee = calculateTdee(bmr, body.activityLevel);

  return { bmi, bmiCategory: classifyBmi(bmi), bmr, tdee };
}
