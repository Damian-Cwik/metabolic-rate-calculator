import { Hono } from "hono";
import type { AppEnv } from "../../lib/app-env.js";
import { validateJson } from "../../lib/validate.js";
import { profileSchema } from "./users.schema.js";
import type { UserService } from "./users.service.js";

export function createUserRoutes(userService: UserService) {
  return new Hono<AppEnv>()
    .get("/me", async (c) => {
      return c.json(await userService.getProfile(c.get("userId")));
    })
    .put("/me", validateJson(profileSchema), async (c) => {
      const profile = c.req.valid("json");
      return c.json(await userService.updateProfile(c.get("userId"), profile));
    });
}
