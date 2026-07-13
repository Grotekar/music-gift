"use client";

type AudioPlayerProps = {
  src?: string;
  title: string;
};

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  if (!src) {
    return (
      <p className="rounded-2xl bg-black/[0.035] px-4 py-3 text-sm text-[var(--muted)]">
        Аудиозапись пока не добавлена
      </p>
    );
  }

  function pauseOtherTracks(current: HTMLAudioElement) {
    document.querySelectorAll("audio").forEach((audio) => {
      if (audio !== current) audio.pause();
    });
  }

  return (
    <div className="rounded-2xl bg-black/[0.035] p-3">
      <audio
        className="block w-full min-w-0"
        controls
        preload="metadata"
        src={src}
        aria-label={`Воспроизвести: ${title}`}
        onPlay={(event) => pauseOtherTracks(event.currentTarget)}
      >
        Ваш браузер не поддерживает воспроизведение аудио.
      </audio>
    </div>
  );
}
