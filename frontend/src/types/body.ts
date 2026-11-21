export const SEX_VALUES = ["male", "female"] as const;
export type Sex = (typeof SEX_VALUES)[number];

export const ACTIVITY_LEVEL_VALUES = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "very_active",
] as const;
export type ActivityLevel = (typeof ACTIVITY_LEVEL_VALUES)[number];

export type BmiCategory = "underweight" | "normal" | "overweight" | "obese";

export interface BodyData {
  sex: Sex;
  weightKg: number;
  heightCm: number;
  age: number;
  activityLevel: ActivityLevel;
}

export interface CalculationResult {
  bmi: number;
  bmiCategory: BmiCategory;
  bmr: number;
  tdee: number;
}
