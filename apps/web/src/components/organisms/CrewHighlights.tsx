import { CrewCard, type CrewSummary } from '../molecules';

interface CrewHighlightsProps {
  crews: readonly CrewSummary[];
}

export function CrewHighlights({ crews }: CrewHighlightsProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {crews.map((c) => (
        <li key={c.id}>
          <CrewCard crew={c} />
        </li>
      ))}
    </ul>
  );
}
