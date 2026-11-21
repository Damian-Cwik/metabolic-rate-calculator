import { Flame, Scale, Zap, type LucideIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TERMS: { icon: LucideIcon; name: string; description: string }[] = [
  {
    icon: Scale,
    name: "BMI",
    description:
      "Wskaźnik masy ciała: waga podzielona przez kwadrat wzrostu. Pokazuje, czy waga mieści się w normie.",
  },
  {
    icon: Flame,
    name: "BMR",
    description:
      "Podstawowa przemiana materii: tyle kalorii spala organizm w spoczynku (wzór Mifflina-St Jeora).",
  },
  {
    icon: Zap,
    name: "TDEE",
    description:
      "Dzienne zapotrzebowanie kaloryczne: BMR pomnożone przez współczynnik aktywności.",
  },
];

export function InfoPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Co obliczamy?</CardTitle>
        <CardDescription>
          Uzupełnij formularz i kliknij "Oblicz".
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {TERMS.map(({ icon: Icon, name, description }) => (
          <div
            key={name}
            className="flex items-start gap-4 rounded-2xl bg-muted/50 p-4"
          >
            <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
              <Icon className="size-5" />
            </div>
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
