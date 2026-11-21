import { Hono } from "hono";
import type { AppEnv } from "../../lib/app-env.js";
import { calculateMeasurementResult } from "../../lib/calculators/measurement.js";
import { validateJson } from "../../lib/validate.js";
import { bodyDataSchema } from "./measurements.schema.js";
import type { MeasurementService } from "./measurements.service.js";

export function createCalculateRoutes() {
  return new Hono().post("/", validateJson(bodyDataSchema), (c) => {
    return c.json(calculateMeasurementResult(c.req.valid("json")));
  });
}

export function createMeasurementRoutes(
  measurementService: MeasurementService,
) {
  return new Hono<AppEnv>()
    .post("/", validateJson(bodyDataSchema), async (c) => {
      const body = c.req.valid("json");
      return c.json(
        await measurementService.create(c.get("userId"), body),
        201,
      );
    })
    .get("/", async (c) => {
      return c.json(await measurementService.list(c.get("userId")));
    })
    .get("/:id", async (c) => {
      return c.json(
        await measurementService.get(c.get("userId"), c.req.param("id")),
      );
    })
    .delete("/:id", async (c) => {
      await measurementService.delete(c.get("userId"), c.req.param("id"));
      return c.body(null, 204);
    });
}
