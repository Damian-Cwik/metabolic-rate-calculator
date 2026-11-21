import { z } from "zod";
import {
  activityLevelSchema,
  heightCmSchema,
  sexSchema,
} from "../../lib/schemas.js";

export const profileSchema = z.object({
  sex: sexSchema,
  birthDate: z.iso.date({ error: "Birth date must be in YYYY-MM-DD format" }),
  heightCm: heightCmSchema,
  activityLevel: activityLevelSchema,
});

export type ProfileInput = z.infer<typeof profileSchema>;
