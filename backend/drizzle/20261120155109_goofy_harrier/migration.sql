CREATE TABLE `measurements` (
	`id` text PRIMARY KEY,
	`user_id` text NOT NULL,
	`weight_kg` real NOT NULL,
	`height_cm` real NOT NULL,
	`age` integer NOT NULL,
	`sex` text NOT NULL,
	`activity_level` text NOT NULL,
	`bmi` real NOT NULL,
	`bmi_category` text NOT NULL,
	`bmr` real NOT NULL,
	`tdee` real NOT NULL,
	`created_at` integer NOT NULL,
	CONSTRAINT `fk_measurements_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY,
	`email` text NOT NULL UNIQUE,
	`password_hash` text NOT NULL,
	`sex` text,
	`birth_date` text,
	`height_cm` real,
	`activity_level` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `measurements_user_id_idx` ON `measurements` (`user_id`);