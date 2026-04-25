import { PodiumCard } from '../molecules';

export interface PodiumCrew {
  id: string;
  name: string;
  color: string;
}

interface CrewPodiumProps {
  /** [first, second, third] in finishing order. */
  top3: readonly [PodiumCrew, PodiumCrew, PodiumCrew];
}

export function CrewPodium({ top3 }: CrewPodiumProps) {
  const [first, second, third] = top3;
  return (
    <div className="flex items-end justify-center gap-2 pb-4 pt-6 sm:gap-3 sm:px-5">
      <PodiumCard rank={2} crewName={second.name} />
      <div className="mb-[28px]">
        <PodiumCard rank={1} crewName={first.name} />
      </div>
      <PodiumCard rank={3} crewName={third.name} />
    </div>
  );
}
