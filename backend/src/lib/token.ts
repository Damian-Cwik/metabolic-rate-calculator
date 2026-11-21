import { sign, verify } from "hono/jwt";
import { UnauthorizedError } from "./errors.js";

const ALGORITHM = "HS256";
const TOKEN_LIFETIME_SECONDS = 60 * 60;

export function signToken(userId: string, secret: string): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + TOKEN_LIFETIME_SECONDS;
  return sign({ sub: userId, exp: expiresAt }, secret, ALGORITHM);
}

export async function verifyToken(
  token: string,
  secret: string,
): Promise<string> {
  try {
    const payload = await verify(token, secret, ALGORITHM);
    return String(payload.sub);
  } catch {
    throw new UnauthorizedError("Invalid or expired token");
  }
}
