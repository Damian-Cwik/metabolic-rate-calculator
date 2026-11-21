import { Trash2 } from "lucide-react";
import { BmiBadge } from "@/components/BmiBadge";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import type { Measurement } from "@/types/api";

interface HistoryTableProps {
  measurements: Measurement[];
  onDelete: (id: string) => void;
}

export function HistoryTable({ measurements, onDelete }: HistoryTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted/50 text-muted-foreground">
          <tr>
            <th className="px-5 py-4 whitespace-nowrap font-medium">Data</th>
            <th className="px-5 py-4 whitespace-nowrap font-medium">Waga</th>
            <th className="px-5 py-4 whitespace-nowrap font-medium">BMI</th>
            <th className="px-5 py-4 whitespace-nowrap font-medium">TDEE</th>
            <th className="px-5 py-4 whitespace-nowrap" />
          </tr>
        </thead>
        <tbody>
          {measurements.map((measurement) => (
            <tr
              key={measurement.id}
              className="border-b last:border-b-0 hover:bg-muted/30"
            >
              <td className="px-5 py-4 whitespace-nowrap">
                {formatDateTime(measurement.createdAt)}
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                {measurement.weightKg} kg
              </td>
              <td className="space-y-1 px-5 py-4 whitespace-nowrap">
                <p>{measurement.bmi}</p>
                <BmiBadge category={measurement.bmiCategory} />
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                {measurement.tdee} kcal
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="py-0 text-destructive"
                  aria-label="Usuń wpis"
                  onClick={() => onDelete(measurement.id)}
                >
                  <Trash2 />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
