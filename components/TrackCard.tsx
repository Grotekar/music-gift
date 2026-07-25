import { AudioPlayer } from "@/components/AudioPlayer";
import { getMediaUrl } from "@/lib/media";
import type { ExternalLinks, Track } from "@/types/gift";

const linkLabels: Record<keyof ExternalLinks, string> = {
  vk: "VK Музыка",
  youtube: "YouTube",
  other: "Слушать полностью",
};

export function TrackCard({ track, number }: { track: Track; number: number }) {
  const audioSource =
    track.mode === "preview" ? track.audioPreview : track.audioFull;
  const audioUrl = audioSource ? getMediaUrl(audioSource.path) : undefined;

  return (
    <article className="border-t border-[var(--line)] py-7 first:border-t-0 first:pt-0">
      <div className="mb-5 flex items-start gap-4">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-xs text-[var(--muted)]">
          {String(number).padStart(2, "0")}
        </span>
        <div className="min-w-0 pt-0.5">
          <h3 className="font-serif text-xl leading-tight text-[var(--ink)]">
            {track.title}
          </h3>
          {track.artist && (
            <p className="mt-1 text-sm text-[var(--muted)]">{track.artist}</p>
          )}
        </div>
      </div>

      {track.description && (
        <p className="mb-5 text-[15px] leading-7 text-[var(--body)]">
          {track.description}
        </p>
      )}

      <AudioPlayer src={audioUrl} title={track.title} />

      {track.externalLinks && (
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {Object.entries(track.externalLinks).map(([service, href]) => (
            <a
              key={service}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:decoration-current"
            >
              {linkLabels[service as keyof ExternalLinks]}
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
