import type { UserRow } from "../../db/schema.js";
import { NotFoundError } from "../../lib/errors.js";
import type { ProfileInput } from "./users.schema.js";
import type { UserRepository } from "./users.repository.js";

export type PublicUser = Omit<UserRow, "passwordHash">;

export function toPublicUser(user: UserRow): PublicUser {
  const { passwordHash: _passwordHash, ...publicUser } = user;
  return publicUser;
}

export class UserService {
  constructor(private readonly users: UserRepository) {}

  async getProfile(userId: string): Promise<PublicUser> {
    const user = await this.users.findById(userId);
    if (!user) throw new NotFoundError("User");
    return toPublicUser(user);
  }

  async updateProfile(
    userId: string,
    profile: ProfileInput,
  ): Promise<PublicUser> {
    const user = await this.users.updateProfile(userId, profile);
    if (!user) throw new NotFoundError("User");
    return toPublicUser(user);
  }
}
