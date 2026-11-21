import type { MeasurementRow } from "../../db/schema.js";
import { calculateMeasurementResult } from "../../lib/calculators/measurement.js";
import type { BodyData } from "../../lib/calculators/types.js";
import { NotFoundError } from "../../lib/errors.js";
import type { MeasurementRepository } from "./measurements.repository.js";

export class MeasurementService {
  constructor(private readonly measurements: MeasurementRepository) {}

  create(userId: string, body: BodyData): Promise<MeasurementRow> {
    return this.measurements.create({
      id: crypto.randomUUID(),
      userId,
      ...body,
      ...calculateMeasurementResult(body),
      createdAt: new Date(),
    });
  }

  list(userId: string): Promise<MeasurementRow[]> {
    return this.measurements.listByUser(userId);
  }

  async get(userId: string, id: string): Promise<MeasurementRow> {
    const measurement = await this.measurements.findByIdForUser(id, userId);
    if (!measurement) throw new NotFoundError("Measurement");
    return measurement;
  }

  async delete(userId: string, id: string): Promise<void> {
    const wasDeleted = await this.measurements.deleteByIdForUser(id, userId);
    if (!wasDeleted) throw new NotFoundError("Measurement");
  }
}
