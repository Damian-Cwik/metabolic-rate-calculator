import {
  index,
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import {
  ACTIVITY_LEVEL_VALUES,
  BMI_CATEGORY_VALUES,
  SEX_VALUES,
} from "../lib/calculators/types.js";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  sex: text("sex", { enum: SEX_VALUES }),
  birthDate: text("birth_date"),
  heightCm: real("height_cm"),
  activityLevel: text("activity_level", { enum: ACTIVITY_LEVEL_VALUES }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
});

export const measurements = sqliteTable(
  "measurements",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    weightKg: real("weight_kg").notNull(),
    heightCm: real("height_cm").notNull(),
    age: integer("age").notNull(),
    sex: text("sex", { enum: SEX_VALUES }).notNull(),
    activityLevel: text("activity_level", {
      enum: ACTIVITY_LEVEL_VALUES,
    }).notNull(),
    bmi: real("bmi").notNull(),
    bmiCategory: text("bmi_category", { enum: BMI_CATEGORY_VALUES }).notNull(),
    bmr: real("bmr").notNull(),
    tdee: real("tdee").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  },
  (table) => [index("measurements_user_id_idx").on(table.userId)],
);

export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;
export type MeasurementRow = typeof measurements.$inferSelect;
export type NewMeasurementRow = typeof measurements.$inferInsert;
