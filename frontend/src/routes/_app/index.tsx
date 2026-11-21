import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  CalculatorForm,
  type CalculatorFormValues,
} from "@/components/CalculatorForm";
import { InfoPanel } from "@/components/InfoPanel";
import { ResultCard } from "@/components/ResultCard";
import { useAuth } from "@/hooks/useAuth";
import { calculateAge } from "@/lib/age";
import { getErrorMessage } from "@/lib/errors";
import { calculate, saveMeasurement } from "@/services/measurementApi";
import type { User } from "@/types/api";
import type { BodyData, CalculationResult } from "@/types/body";

export const Route = createFileRoute("/_app/")({
  component: CalculatorPage,
});

function buildInitialValues(user: User | null): CalculatorFormValues {
  return {
    sex: user?.sex ?? "",
    weightKg: "",
    heightCm: user?.heightCm?.toString() ?? "",
    age: user?.birthDate ? calculateAge(user.birthDate).toString() : "",
    activityLevel: user?.activityLevel ?? "",
  };
}

function CalculatorPage() {
  const user = useAuth((state) => state.user);
  const [submittedBody, setSubmittedBody] = useState<BodyData | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCalculate = async (body: BodyData) => {
    setIsCalculating(true);
    try {
      setResult(await calculate(body));
      setSubmittedBody(body);
      setIsSaved(false);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSave = async () => {
    if (!submittedBody) return;
    setIsSaving(true);
    try {
      await saveMeasurement(submittedBody);
      setIsSaved(true);
      toast.success("Wynik zapisano w historii");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <CalculatorForm
        initialValues={buildInitialValues(user)}
        isSubmitting={isCalculating}
        onSubmit={handleCalculate}
      />
      {result ? (
        <ResultCard
          result={result}
          isSaving={isSaving}
          isSaved={isSaved}
          onSave={handleSave}
        />
      ) : (
        <InfoPanel />
      )}
    </div>
  );
}
