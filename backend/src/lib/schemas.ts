import { z } from "zod";
import { ACTIVITY_LEVEL_VALUES, SEX_VALUES } from "./calculators/types.js";

export const sexSchema = z.enum(SEX_VALUES, {
  error: "Sex must be male or female",
});

export const activityLevelSchema = z.enum(ACTIVITY_LEVEL_VALUES, {
  error: "Unknown activity level",
});

export const weightKgSchema = z
  .number({ error: "Weight must be a number" })
  .min(20, "Weight must be at least 20 kg")
  .max(400, "Weight must be at most 400 kg");

export const heightCmSchema = z
  .number({ error: "Height must be a number" })
  .min(50, "Height must be at least 50 cm")
  .max(250, "Height must be at most 250 cm");

export const ageSchema = z
  .number({ error: "Age must be a number" })
  .int("Age must be a whole number")
  .min(10, "Age must be at least 10")
  .max(120, "Age must be at most 120");
