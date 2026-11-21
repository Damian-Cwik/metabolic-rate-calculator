import { zValidator } from "@hono/zod-validator";
import type { ZodType } from "zod";
import { ValidationError } from "./errors.js";

export function validateJson<Schema extends ZodType>(schema: Schema) {
  return zValidator("json", schema, (result) => {
    if (!result.success) {
      throw new ValidationError(
        result.error.issues[0]?.message ?? "Invalid request",
      );
    }
  });
}
