import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";
import { deleteMeasurement, getMeasurements } from "@/services/measurementApi";
import type { Measurement } from "@/types/api";

export function useMeasurements() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMeasurements()
      .then(setMeasurements)
      .catch((error: unknown) => toast.error(getErrorMessage(error)))
      .finally(() => setIsLoading(false));
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await deleteMeasurement(id);
      setMeasurements((current) => current.filter((item) => item.id !== id));
      toast.success("Wpis został usunięty");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  }, []);

  return { measurements, isLoading, remove };
}
