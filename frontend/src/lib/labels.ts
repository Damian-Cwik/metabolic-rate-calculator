import type { ActivityLevel, BmiCategory, Sex } from "@/types/body";

export const SEX_LABELS: Record<Sex, string> = {
  male: "Mężczyzna",
  female: "Kobieta",
};

export const ACTIVITY_LABELS: Record<ActivityLevel, string> = {
  sedentary: "Siedzący tryb życia (brak ćwiczeń)",
  light: "Lekka aktywność (1-3 treningi w tygodniu)",
  moderate: "Umiarkowana aktywność (3-5 treningów w tygodniu)",
  active: "Duża aktywność (6-7 treningów w tygodniu)",
  very_active: "Bardzo duża aktywność (praca fizyczna + treningi)",
};

export const BMI_CATEGORY_LABELS: Record<BmiCategory, string> = {
  underweight: "Niedowaga",
  normal: "Waga prawidłowa",
  overweight: "Nadwaga",
  obese: "Otyłość",
};
