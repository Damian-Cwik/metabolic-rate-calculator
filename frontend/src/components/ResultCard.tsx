import { Check, Flame, Save, Scale, Zap, type LucideIcon } from "lucide-react";
import { BmiBadge } from "@/components/BmiBadge";
import { BmiScale } from "@/components/BmiScale";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalculationResult } from "@/types/body";

interface ResultCardProps {
  result: CalculationResult;
  isSaving: boolean;
  isSaved: boolean;
  onSave: () => void;
}

interface ResultTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
  children?: React.ReactNode;
}

function ResultTile({
  icon: Icon,
  label,
  value,
  hint,
  children,
}: ResultTileProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-muted/50 p-4">
      <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
        <Icon className="size-5" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm text-muted-foreground">
          {label} - {hint}
        </p>
        <p className="text-2xl font-semibold" data-testid={`result-${label}`}>
          {value}
        </p>
        {children}
      </div>
    </div>
  );
}

export function ResultCard({
  result,
  isSaving,
  isSaved,
  onSave,
}: ResultCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Twoje wyniki</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ResultTile
          icon={Scale}
          label="BMI"
          value={String(result.bmi)}
          hint="wskaźnik masy ciała"
        >
          <BmiBadge category={result.bmiCategory} />
          <div className="pt-3">
            <BmiScale bmi={result.bmi} />
          </div>
        </ResultTile>
        <ResultTile
          icon={Flame}
          label="BMR"
          value={`${result.bmr} kcal`}
          hint="podstawowa przemiana materii"
        />
        <ResultTile
          icon={Zap}
          label="TDEE"
          value={`${result.tdee} kcal`}
          hint="dzienne zapotrzebowanie"
        />
        <Button
          variant="outline"
          className="w-full"
          disabled={isSaving || isSaved}
          onClick={onSave}
        >
          {isSaved ? <Check /> : <Save />}
          {isSaved ? "Zapisano w historii" : "Zapisz w historii"}
        </Button>
      </CardContent>
    </Card>
  );
}
