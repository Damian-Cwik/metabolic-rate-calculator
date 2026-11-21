import { Save } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { FormField } from "@/components/FormField";
import { SelectField } from "@/components/SelectField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/lib/errors";
import { ACTIVITY_LABELS, SEX_LABELS } from "@/lib/labels";
import {
  profileSchema,
  validateForm,
  type FieldErrors,
} from "@/lib/validation";
import { updateProfile } from "@/services/userApi";

export function ProfileForm() {
  const user = useAuth((state) => state.user);
  const updateUser = useAuth((state) => state.updateUser);
  const [values, setValues] = useState({
    sex: user?.sex ?? "",
    birthDate: user?.birthDate ?? "",
    heightCm: user?.heightCm?.toString() ?? "",
    activityLevel: user?.activityLevel ?? "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const setValue = (field: keyof typeof values) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validation = validateForm(profileSchema, values);
    setErrors(validation.success ? {} : validation.errors);
    if (!validation.success) return;

    setIsSaving(true);
    try {
      updateUser(await updateProfile(validation.data));
      toast.success("Profil został zapisany");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Profil</CardTitle>
        <CardDescription>
          Dane z profilu uzupełniają formularz kalkulatora.
        </CardDescription>
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
            label="Data urodzenia"
            name="birthDate"
            type="date"
            value={values.birthDate}
            error={errors.birthDate}
            onChange={(event) => setValue("birthDate")(event.target.value)}
          />
          <FormField
            label="Wzrost (cm)"
            name="heightCm"
            type="number"
            value={values.heightCm}
            error={errors.heightCm}
            onChange={(event) => setValue("heightCm")(event.target.value)}
          />
          <SelectField
            label="Domyślny poziom aktywności"
            name="activityLevel"
            value={values.activityLevel}
            options={ACTIVITY_LABELS}
            error={errors.activityLevel}
            onChange={setValue("activityLevel")}
          />
          <Button type="submit" className="w-full" disabled={isSaving}>
            <Save />
            Zapisz profil
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
