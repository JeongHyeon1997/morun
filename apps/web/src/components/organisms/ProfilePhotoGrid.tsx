import { IconPlaceholder } from '../atoms';

export interface ProfilePhoto {
  id: string;
  url?: string | null;
}

interface ProfilePhotoGridProps {
  photos: readonly ProfilePhoto[];
}

export function ProfilePhotoGrid({ photos }: ProfilePhotoGridProps) {
  return (
    <ul className="grid grid-cols-3 gap-px border-y border-divider bg-divider">
      {photos.map((p) => (
        <li
          key={p.id}
          className="aspect-[142/185] overflow-hidden bg-surface-alt"
        >
          {p.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.url} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <IconPlaceholder size={32} variant="square" tone="muted" label="📷" />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
