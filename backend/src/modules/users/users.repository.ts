import { eq } from "drizzle-orm";
import type { AppDatabase } from "../../db/index.js";
import { users, type NewUserRow, type UserRow } from "../../db/schema.js";

export interface ProfileData {
  sex: UserRow["sex"];
  birthDate: UserRow["birthDate"];
  heightCm: UserRow["heightCm"];
  activityLevel: UserRow["activityLevel"];
}

export interface UserRepository {
  findByEmail(email: string): Promise<UserRow | undefined>;
  findById(id: string): Promise<UserRow | undefined>;
  create(user: NewUserRow): Promise<UserRow>;
  updateProfile(id: string, profile: ProfileData): Promise<UserRow | undefined>;
}

export function createUserRepository(db: AppDatabase): UserRepository {
  return {
    async findByEmail(email) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      return user;
    },

    async findById(id) {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    },

    async create(user) {
      const [created] = await db.insert(users).values(user).returning();
      return created;
    },

    async updateProfile(id, profile) {
      const [updated] = await db
        .update(users)
        .set(profile)
        .where(eq(users.id, id))
        .returning();
      return updated;
    },
  };
}
