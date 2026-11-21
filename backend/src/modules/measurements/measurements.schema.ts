import { z } from "zod";
import {
  activityLevelSchema,
  ageSchema,
  heightCmSchema,
  sexSchema,
  weightKgSchema,
} from "../../lib/schemas.js";

export const bodyDataSchema = z.object({
  sex: sexSchema,
  weightKg: weightKgSchema,
  heightCm: heightCmSchema,
  age: ageSchema,
  activityLevel: activityLevelSchema,
});
