import type { UserRow } from "../../db/schema.js";
import { EmailTakenError, InvalidCredentialsError } from "../../lib/errors.js";
import { hashPassword, verifyPassword } from "../../lib/password.js";
import { signToken } from "../../lib/token.js";
import type { UserRepository } from "../users/users.repository.js";
import { toPublicUser, type PublicUser } from "../users/users.service.js";
import type { LoginInput, RegisterInput } from "./auth.schema.js";

export interface AuthResult {
  token: string;
  user: PublicUser;
}

export class AuthService {
  constructor(
    private readonly users: UserRepository,
    private readonly jwtSecret: string,
  ) {}

  async register({ email, password }: RegisterInput): Promise<AuthResult> {
    const existingUser = await this.users.findByEmail(email);
    if (existingUser) throw new EmailTakenError();

    const user = await this.users.create({
      id: crypto.randomUUID(),
      email,
      passwordHash: await hashPassword(password),
      createdAt: new Date(),
    });

    return this.buildAuthResult(user);
  }

  async login({ email, password }: LoginInput): Promise<AuthResult> {
    const user = await this.users.findByEmail(email);
    if (!user) throw new InvalidCredentialsError();

    const isPasswordCorrect = await verifyPassword(user.passwordHash, password);
    if (!isPasswordCorrect) throw new InvalidCredentialsError();

    return this.buildAuthResult(user);
  }

  private async buildAuthResult(user: UserRow): Promise<AuthResult> {
    return {
      token: await signToken(user.id, this.jwtSecret),
      user: toPublicUser(user),
    };
  }
}
