import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { createDatabase, runMigrations } from "./db/index.js";

const jwtSecret = process.env.JWT_SECRET;
const databaseUrl = process.env.DATABASE_URL;
if (!jwtSecret || !databaseUrl) {
  throw new Error("JWT_SECRET and DATABASE_URL must be set (see .env.example)");
}

const port = Number(process.env.PORT ?? 3000);
const db = createDatabase(databaseUrl);
runMigrations(db);

const app = createApp({
  db,
  jwtSecret,
  allowedOrigin: "http://localhost:5173",
});

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
