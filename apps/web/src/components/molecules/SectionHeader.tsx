interface SectionHeaderProps {
  title: string;
  caption?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function SectionHeader({
  title,
  caption,
  actionLabel,
  actionHref = '#',
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-extrabold tracking-tight text-text-primary">{title}</h2>
        {caption ? <p className="mt-1 text-sm text-text-muted">{caption}</p> : null}
      </div>
      {actionLabel ? (
        <a
          href={actionHref}
          className="shrink-0 text-sm font-semibold text-text-secondary hover:text-text-primary"
        >
          {actionLabel} →
        </a>
      ) : null}
    </div>
  );
}
