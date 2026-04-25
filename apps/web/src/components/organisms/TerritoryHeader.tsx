interface TerritoryHeaderProps {
  region: string;
  caption: string;
}

export function TerritoryHeader({ region, caption }: TerritoryHeaderProps) {
  return (
    <div className="flex items-baseline gap-2 px-5 pb-2 pt-3">
      <h1 className="text-2xl font-extrabold tracking-tight text-text-primary">{region}</h1>
      <span className="text-[13px] font-medium text-text-muted">{caption}</span>
    </div>
  );
}
