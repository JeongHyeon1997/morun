import { MemberRow, type CrewMember } from '../molecules';

interface CrewMemberListProps {
  members: readonly CrewMember[];
}

export function CrewMemberList({ members }: CrewMemberListProps) {
  return (
    <ul className="px-4">
      {members.map((m) => (
        <MemberRow key={m.id} member={m} />
      ))}
    </ul>
  );
}
