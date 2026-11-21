import { Calculator } from "lucide-react";
import { useState, type FormEvent } from "react";
import { FormField } from "@/components/FormField";
import { SelectField } from "@/components/SelectField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACTIVITY_LABELS, SEX_LABELS } from "@/lib/labels";
import {
  bodyDataSchema,
  validateForm,
  type FieldErrors,
} from "@/lib/validation";
import type { BodyData } from "@/types/body";

export interface CalculatorFormValues {
  sex: string;
  weightKg: string;
  heightCm: string;
  age: string;
  activityLevel: string;
}

interface CalculatorFormProps {
  initialValues: CalculatorFormValues;
  isSubmitting: boolean;
  onSubmit: (body: BodyData) => void;
}

export function CalculatorForm({
  initialValues,
  isSubmitting,
  onSubmit,
}: CalculatorFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});

  const setValue = (field: keyof CalculatorFormValues) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateForm(bodyDataSchema, values);
    setErrors(validation.success ? {} : validation.errors);
    if (validation.success) onSubmit(validation.data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Twoje dane</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <SelectField
            label="Płeć"
            name="sex"
            value={values.sex}
            options={SEX_LABELS}
            error={errors.sex}
            onChange={setValue("sex")}
          />
          <FormField
            label="Waga (kg)"
            name="weightKg"
            type="number"
            step="0.1"
            value={values.weightKg}
            error={errors.weightKg}
            onChange={(event) => setValue("weightKg")(event.target.value)}
          />
          <FormField
            label="Wzrost (cm)"
            name="heightCm"
            type="number"
            value={values.heightCm}
            error={errors.heightCm}
            onChange={(event) => setValue("heightCm")(event.target.value)}
          />
          <FormField
            label="Wiek (lata)"
            name="age"
            type="number"
            value={values.age}
            error={errors.age}
            onChange={(event) => setValue("age")(event.target.value)}
          />
          <SelectField
            label="Poziom aktywności"
            name="activityLevel"
            value={values.activityLevel}
            options={ACTIVITY_LABELS}
            error={errors.activityLevel}
            onChange={setValue("activityLevel")}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <Calculator />
            Oblicz
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
