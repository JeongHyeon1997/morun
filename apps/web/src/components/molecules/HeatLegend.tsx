interface HeatLegendProps {
  steps: readonly { color: string; label: string }[];
  caption?: string;
}

export function HeatLegend({ steps, caption = '활동량' }: HeatLegendProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
      <span className="text-text-muted">{caption}</span>
      {steps.map((s) => (
        <span key={s.label} className="inline-flex items-center gap-1">
          <span
            className="inline-block h-3 w-3 rounded-sm"
            style={{ backgroundColor: s.color }}
            aria-hidden
          />
          <span className="font-semibold">{s.label}</span>
        </span>
      ))}
    </div>
  );
}
