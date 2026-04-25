import { IconPlaceholder } from '../atoms';

interface QuickCategoryItemProps {
  label: string;
  glyph?: string;
}

export function QuickCategoryItem({ label, glyph }: QuickCategoryItemProps) {
  return (
    <a
      href="#"
      className="flex flex-col items-center gap-2 text-center transition-opacity hover:opacity-80"
    >
      {/* TODO(icons): replace with provided category icon */}
      <IconPlaceholder size={56} variant="circle" tone="muted" label={glyph ?? label.slice(0, 2)} />
      <span className="text-xs font-semibold text-text-primary">{label}</span>
    </a>
  );
}
