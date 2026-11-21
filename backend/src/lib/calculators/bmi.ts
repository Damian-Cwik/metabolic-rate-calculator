import type { BmiCategory } from "./types.js";

const UNDERWEIGHT_LIMIT = 18.5;
const NORMAL_LIMIT = 25;
const OVERWEIGHT_LIMIT = 30;

export function calculateBmi(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  return roundToOneDecimal(bmi);
}

export function classifyBmi(bmi: number): BmiCategory {
  if (bmi < UNDERWEIGHT_LIMIT) return "underweight";
  if (bmi < NORMAL_LIMIT) return "normal";
  if (bmi < OVERWEIGHT_LIMIT) return "overweight";
  return "obese";
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}
