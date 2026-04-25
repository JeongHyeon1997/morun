import { QuickCategoryItem } from '../molecules';

const ITEMS = [
  { label: '한강런', glyph: '한강' },
  { label: '트레일', glyph: '트레일' },
  { label: '5K', glyph: '5K' },
  { label: '10K', glyph: '10K' },
  { label: '하프', glyph: '하프' },
  { label: '풀코스', glyph: '풀' },
  { label: '새벽런', glyph: '새벽' },
  { label: '야간런', glyph: '야간' },
] as const;

export function QuickCategoryGrid() {
  return (
    <ul className="grid grid-cols-4 gap-y-6 sm:grid-cols-8">
      {ITEMS.map((i) => (
        <li key={i.label}>
          <QuickCategoryItem label={i.label} glyph={i.glyph} />
        </li>
      ))}
    </ul>
  );
}
