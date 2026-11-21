import { and, desc, eq } from "drizzle-orm";
import type { AppDatabase } from "../../db/index.js";
import {
  measurements,
  type MeasurementRow,
  type NewMeasurementRow,
} from "../../db/schema.js";

export interface MeasurementRepository {
  create(measurement: NewMeasurementRow): Promise<MeasurementRow>;
  listByUser(userId: string): Promise<MeasurementRow[]>;
  findByIdForUser(
    id: string,
    userId: string,
  ): Promise<MeasurementRow | undefined>;
  deleteByIdForUser(id: string, userId: string): Promise<boolean>;
}

export function createMeasurementRepository(
  db: AppDatabase,
): MeasurementRepository {
  const belongsToUser = (id: string, userId: string) =>
    and(eq(measurements.id, id), eq(measurements.userId, userId));

  return {
    async create(measurement) {
      const [created] = await db
        .insert(measurements)
        .values(measurement)
        .returning();
      return created;
    },

    listByUser(userId) {
      return db
        .select()
        .from(measurements)
        .where(eq(measurements.userId, userId))
        .orderBy(desc(measurements.createdAt));
    },

    async findByIdForUser(id, userId) {
      const [measurement] = await db
        .select()
        .from(measurements)
        .where(belongsToUser(id, userId));
      return measurement;
    },

    async deleteByIdForUser(id, userId) {
      const deleted = await db
        .delete(measurements)
        .where(belongsToUser(id, userId))
        .returning({ id: measurements.id });
      return deleted.length > 0;
    },
  };
}
