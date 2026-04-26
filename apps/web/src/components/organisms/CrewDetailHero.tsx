import { IconPlaceholder } from '../atoms';

interface CrewDetailHeroProps {
  imageUrl?: string | null;
  shortName: string;
  tagline: string;
}

export function CrewDetailHero({ imageUrl, shortName, tagline }: CrewDetailHeroProps) {
  return (
    <div className="relative h-[200px] w-full overflow-hidden bg-surface-alt">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <IconPlaceholder size={64} variant="square" tone="muted" label="🏃" />
        </div>
      )}
      <div className="absolute inset-y-0 right-0 flex w-1/2 flex-col justify-center gap-1 pr-5 text-right">
        <p className="text-base font-bold tracking-tight text-white drop-shadow">
          ㆍ {shortName} ㆍ
        </p>
        <p className="break-keep text-sm font-medium leading-snug text-white/95 drop-shadow">
          {tagline}
        </p>
      </div>
    </div>
  );
}
