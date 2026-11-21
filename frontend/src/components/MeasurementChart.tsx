import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Measurement } from "@/types/api";

const METRICS = {
  weightKg: { label: "Waga", unit: "kg" },
  bmi: { label: "BMI", unit: "" },
  tdee: { label: "TDEE", unit: "kcal" },
} as const;

type MetricKey = keyof typeof METRICS;

const formatShortDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
  });

export function MeasurementChart({
  measurements,
}: {
  measurements: Measurement[];
}) {
  const [metric, setMetric] = useState<MetricKey>("weightKg");
  const points = [...measurements].reverse().map((item) => ({
    date: formatShortDate(item.createdAt),
    value: item[metric],
  }));
  const { label, unit } = METRICS[metric];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-lg">Zmiany w czasie</CardTitle>
        <div className="flex gap-1">
          {(Object.keys(METRICS) as MetricKey[]).map((key) => (
            <Button
              key={key}
              size="sm"
              className="py-4"
              variant={key === metric ? "default" : "ghost"}
              onClick={() => setMetric(key)}
            >
              {METRICS[key].label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={points}
            margin={{ top: 8, right: 16, bottom: 0, left: -16 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" tickLine={false} fontSize={12} />
            <YAxis
              domain={["auto", "auto"]}
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />
            <Tooltip
              formatter={(value) => [`${value} ${unit}`.trim(), label]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
