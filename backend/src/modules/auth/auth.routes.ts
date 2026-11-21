import { Hono } from "hono";
import { validateJson } from "../../lib/validate.js";
import { loginSchema, registerSchema } from "./auth.schema.js";
import type { AuthService } from "./auth.service.js";

export function createAuthRoutes(authService: AuthService) {
  return new Hono()
    .post("/register", validateJson(registerSchema), async (c) => {
      const result = await authService.register(c.req.valid("json"));
      return c.json(result, 201);
    })
    .post("/login", validateJson(loginSchema), async (c) => {
      const result = await authService.login(c.req.valid("json"));
      return c.json(result);
    });
}
