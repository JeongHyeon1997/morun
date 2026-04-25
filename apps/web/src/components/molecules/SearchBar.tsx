import { IconPlaceholder } from '../atoms';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  placeholder = '크루, 대회, 코스를 검색해보세요',
  className = '',
}: SearchBarProps) {
  return (
    <form
      role="search"
      className={`flex h-12 items-center gap-2 rounded-full border-2 border-brand bg-white px-4 ${className}`}
    >
      <input
        type="search"
        name="q"
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
      />
      {/* TODO(icons): replace with provided search glyph */}
      <button type="submit" aria-label="검색" className="shrink-0">
        <IconPlaceholder size={28} variant="circle" tone="primary" label="🔍" />
      </button>
    </form>
  );
}
