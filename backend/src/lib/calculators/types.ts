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

export const BMI_CATEGORY_VALUES = [
  "underweight",
  "normal",
  "overweight",
  "obese",
] as const;
export type BmiCategory = (typeof BMI_CATEGORY_VALUES)[number];

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
