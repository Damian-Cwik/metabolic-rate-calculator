import { BMI_CATEGORY_LABELS } from "@/lib/labels";
import { cn } from "@/lib/utils";
import type { BmiCategory } from "@/types/body";

export const BMI_CATEGORY_COLORS: Record<BmiCategory, string> = {
  underweight: "bg-sky-100 text-sky-800",
  normal: "bg-emerald-100 text-emerald-800",
  overweight: "bg-amber-100 text-amber-800",
  obese: "bg-red-100 text-red-800",
};

export function BmiBadge({ category }: { category: BmiCategory }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        BMI_CATEGORY_COLORS[category],
      )}
    >
      {BMI_CATEGORY_LABELS[category]}
    </span>
  );
}
