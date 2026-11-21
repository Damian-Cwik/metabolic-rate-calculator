const SCALE_MIN = 15;
const SCALE_MAX = 40;

const SEGMENTS = [
  { label: "< 18,5", from: SCALE_MIN, to: 18.5, color: "bg-sky-400" },
  { label: "18,5 - 25", from: 18.5, to: 25, color: "bg-emerald-500" },
  { label: "25 - 30", from: 25, to: 30, color: "bg-amber-400" },
  { label: "> 30", from: 30, to: SCALE_MAX, color: "bg-red-500" },
];

const toPercent = (value: number) =>
  ((Math.min(Math.max(value, SCALE_MIN), SCALE_MAX) - SCALE_MIN) /
    (SCALE_MAX - SCALE_MIN)) *
  100;

export function BmiScale({ bmi }: { bmi: number }) {
  return (
    <div className="space-y-1">
      <div className="relative pt-3">
        <div className="flex h-3 overflow-hidden rounded-full">
          {SEGMENTS.map((segment) => (
            <div
              key={segment.label}
              className={segment.color}
              style={{
                width: `${toPercent(segment.to) - toPercent(segment.from)}%`,
              }}
            />
          ))}
        </div>
        <div
          className="absolute top-0 -translate-x-1/2"
          style={{ left: `${toPercent(bmi)}%` }}
        >
          <div className="mx-auto h-0 w-0 border-x-[6px] border-t-[8px] border-x-transparent border-t-foreground" />
        </div>
      </div>
      <div className="flex text-xs text-muted-foreground">
        {SEGMENTS.map((segment) => (
          <span
            key={segment.label}
            className="text-center"
            style={{
              width: `${toPercent(segment.to) - toPercent(segment.from)}%`,
            }}
          >
            {segment.label}
          </span>
        ))}
      </div>
    </div>
  );
}
