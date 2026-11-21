import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import type { AppDatabase } from "./db/index.js";
import { AppError } from "./lib/errors.js";
import { requireAuth } from "./middleware/auth.js";
import { createAuthRoutes } from "./modules/auth/auth.routes.js";
import { AuthService } from "./modules/auth/auth.service.js";
import { createMeasurementRepository } from "./modules/measurements/measurements.repository.js";
import {
  createCalculateRoutes,
  createMeasurementRoutes,
} from "./modules/measurements/measurements.routes.js";
import { MeasurementService } from "./modules/measurements/measurements.service.js";
import { createUserRepository } from "./modules/users/users.repository.js";
import { createUserRoutes } from "./modules/users/users.routes.js";
import { UserService } from "./modules/users/users.service.js";

export interface AppDependencies {
  db: AppDatabase;
  jwtSecret: string;
  allowedOrigin?: string;
}

export function createApp({ db, jwtSecret, allowedOrigin }: AppDependencies) {
  const userRepository = createUserRepository(db);
  const authService = new AuthService(userRepository, jwtSecret);
  const userService = new UserService(userRepository);
  const measurementService = new MeasurementService(
    createMeasurementRepository(db),
  );
  const authenticate = requireAuth(jwtSecret);

  const app = new Hono().basePath("/api");

  if (allowedOrigin) app.use("*", cors({ origin: allowedOrigin }));

  app.use(logger());

  app.onError((error, c) => {
    if (error instanceof AppError) {
      return c.json({ message: error.message }, error.status);
    }
    console.error(error);
    return c.json({ message: "Internal server error" }, 500);
  });

  app.route("/auth", createAuthRoutes(authService));
  app.route("/calculate", createCalculateRoutes());

  app.use("/users/*", authenticate);
  app.route("/users", createUserRoutes(userService));

  app.use("/measurements/*", authenticate);
  app.route("/measurements", createMeasurementRoutes(measurementService));

  return app;
}
