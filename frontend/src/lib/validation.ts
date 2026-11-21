import { z, type ZodType } from "zod";
import { ACTIVITY_LEVEL_VALUES, SEX_VALUES } from "@/types/body";

const sexSchema = z.enum(SEX_VALUES, { error: "Wybierz płeć" });
const activityLevelSchema = z.enum(ACTIVITY_LEVEL_VALUES, {
  error: "Wybierz poziom aktywności",
});

const weightKgSchema = z.coerce
  .number({ error: "Podaj wagę" })
  .min(20, "Waga musi wynosić co najmniej 20 kg")
  .max(400, "Waga może wynosić co najwyżej 400 kg");

const heightCmSchema = z.coerce
  .number({ error: "Podaj wzrost" })
  .min(50, "Wzrost musi wynosić co najmniej 50 cm")
  .max(250, "Wzrost może wynosić co najwyżej 250 cm");

const ageSchema = z.coerce
  .number({ error: "Podaj wiek" })
  .int("Wiek musi być liczbą całkowitą")
  .min(10, "Wiek musi wynosić co najmniej 10 lat")
  .max(120, "Wiek może wynosić co najwyżej 120 lat");

export const bodyDataSchema = z.object({
  sex: sexSchema,
  weightKg: weightKgSchema,
  heightCm: heightCmSchema,
  age: ageSchema,
  activityLevel: activityLevelSchema,
});

export const profileSchema = z.object({
  sex: sexSchema,
  birthDate: z.iso.date({ error: "Podaj datę urodzenia" }),
  heightCm: heightCmSchema,
  activityLevel: activityLevelSchema,
});

const emailSchema = z.email("Podaj poprawny adres e-mail");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Podaj hasło"),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
});

export type FieldErrors = Record<string, string>;

export type ValidationResult<T> =
  { success: true; data: T } | { success: false; errors: FieldErrors };

export function validateForm<T>(
  schema: ZodType<T>,
  values: unknown,
): ValidationResult<T> {
  const result = schema.safeParse(values);
  if (result.success) return { success: true, data: result.data };

  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const field = String(issue.path[0]);
    errors[field] ??= issue.message;
  }
  return { success: false, errors };
}
