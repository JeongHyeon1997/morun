import { IconPlus } from '../atoms';

export interface BoardFilter {
  id: string;
  label: string;
}

interface BoardFiltersProps {
  filters: readonly BoardFilter[];
  activeId?: string;
}

export function BoardFilters({ filters, activeId }: BoardFiltersProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto px-5 py-2">
      {filters.map((f) => {
        const active = f.id === activeId;
        return (
          <button
            key={f.id}
            type="button"
            className={[
              'shrink-0 rounded-full border px-3 py-1 text-xs font-medium',
              active
                ? 'border-brand bg-brand text-white'
                : 'border-divider bg-white text-text-secondary',
            ].join(' ')}
          >
            {f.label}
          </button>
        );
      })}
      <button
        type="button"
        aria-label="필터 추가"
        className="ml-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-divider bg-white"
      >
        <IconPlus size={14} color="#3C3C3C" />
      </button>
    </div>
  );
}
