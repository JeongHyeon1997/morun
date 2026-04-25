import { Pill } from '../atoms';

export interface CrewSummary {
  id: string;
  name: string;
  region: string;
  members: number;
  pace: string;
}

interface CrewCardProps {
  crew: CrewSummary;
}

export function CrewCard({ crew }: CrewCardProps) {
  return (
    <a
      href="#"
      className="block w-full overflow-hidden rounded-xl border border-border bg-white transition-shadow hover:shadow-md"
    >
      <div className="aspect-[4/3] w-full bg-surface-alt" aria-hidden />
      <div className="space-y-2 p-4">
        <div className="flex flex-wrap gap-1">
          <Pill label={crew.region} />
          <Pill label={crew.pace} />
        </div>
        <h3 className="truncate text-sm font-bold text-text-primary">{crew.name}</h3>
        <p className="text-xs text-text-muted">멤버 {crew.members.toLocaleString()}명</p>
      </div>
    </a>
  );
}
