import type { Sex } from "./types.js";

const SEX_CONSTANT: Record<Sex, number> = {
  male: 5,
  female: -161,
};

export interface BmrInput {
  sex: Sex;
  weightKg: number;
  heightCm: number;
  age: number;
}

export function calculateBmr({
  sex,
  weightKg,
  heightCm,
  age,
}: BmrInput): number {
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + SEX_CONSTANT[sex];
  return Math.round(bmr);
}
