import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";
import { HistoryTable } from "@/components/HistoryTable";
import { MeasurementChart } from "@/components/MeasurementChart";
import { Button } from "@/components/ui/button";
import { useMeasurements } from "@/hooks/useMeasurements";

export const Route = createFileRoute("/_app/history")({
  component: HistoryPage,
});

function EmptyHistory() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed bg-white p-12 text-center">
      <ClipboardList className="size-10 text-muted-foreground" />
      <p className="text-muted-foreground">
        Nie masz jeszcze zapisanych wyników.
      </p>
      <Button asChild>
        <Link to="/">Przejdź do kalkulatora</Link>
      </Button>
    </div>
  );
}

function HistoryPage() {
  const { measurements, isLoading, remove } = useMeasurements();

  if (isLoading) return <p className="text-muted-foreground">Ładowanie...</p>;
  if (measurements.length === 0) return <EmptyHistory />;

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[3fr_2fr]">
      <HistoryTable measurements={measurements} onDelete={remove} />
      <MeasurementChart measurements={measurements} />
    </div>
  );
}
