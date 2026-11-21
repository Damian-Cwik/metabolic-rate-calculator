import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../lib/app-env.js";
import { UnauthorizedError } from "../lib/errors.js";
import { verifyToken } from "../lib/token.js";

const BEARER_PREFIX = "Bearer ";

export function requireAuth(jwtSecret: string) {
  return createMiddleware<AppEnv>(async (c, next) => {
    const header = c.req.header("Authorization");
    if (!header?.startsWith(BEARER_PREFIX)) throw new UnauthorizedError();

    const token = header.slice(BEARER_PREFIX.length);
    c.set("userId", await verifyToken(token, jwtSecret));
    await next();
  });
}
