import { CalendarDays, Mail, UserRound, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { calculateAge } from "@/lib/age";
import { formatDateTime } from "@/lib/format";

function SummaryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-muted/50 p-4">
      <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
    </div>
  );
}

export function AccountSummary() {
  const user = useAuth((state) => state.user);
  if (!user) return null;

  const ageText = user.birthDate
    ? `${calculateAge(user.birthDate)} lat`
    : "Uzupełnij profil";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Twoje konto</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <SummaryRow icon={Mail} label="E-mail" value={user.email} />
        <SummaryRow icon={UserRound} label="Wiek" value={ageText} />
        <SummaryRow
          icon={CalendarDays}
          label="Konto założone"
          value={formatDateTime(user.createdAt)}
        />
      </CardContent>
    </Card>
  );
}
