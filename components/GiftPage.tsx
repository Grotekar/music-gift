import Image from "next/image";
import { ScriptureQuote } from "@/components/ScriptureQuote";
import { TrackCard } from "@/components/TrackCard";
import { publicPath } from "@/lib/paths";
import type { Gift } from "@/types/gift";

export function GiftPage({ gift }: { gift: Gift }) {
  return (
    <main data-theme={gift.theme} className="gift-theme min-h-screen bg-[var(--paper)]">
      <article className="mx-auto w-full max-w-[43rem] px-5 py-5 sm:px-8 sm:py-10">
        <div className="overflow-hidden rounded-[2rem] bg-[var(--wash)] shadow-[0_24px_70px_rgba(52,48,42,0.08)]">
          <Image
            src={publicPath(gift.coverImage)}
            alt=""
            width={800}
            height={800}
            priority
            className="aspect-square h-auto w-full object-cover"
          />
        </div>

        <div className="px-1 pb-10 pt-12 sm:px-6 sm:pt-16">
          <header>
            {gift.subtitle && (
              <p className="mb-4 text-xs font-medium tracking-[0.18em] text-[var(--accent)] uppercase">
                {gift.subtitle}
              </p>
            )}
            <h1 className="max-w-xl font-serif text-[clamp(2.5rem,10vw,4.5rem)] leading-[0.98] tracking-[-0.035em] text-[var(--ink)]">
              {gift.title}
            </h1>
            <div className="mt-8 max-w-[38rem] space-y-5">
              {gift.message.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[1.05rem] leading-8 text-[var(--body)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </header>

          <section className="mt-16" aria-labelledby="tracks-heading">
            <p className="font-serif text-lg italic text-[var(--accent)]">
              {gift.tracksIntro}
            </p>
            <h2 id="tracks-heading" className="sr-only">
              Музыкальный подарок
            </h2>
            <div className="mt-8">
              {gift.tracks.map((track, index) => (
                <TrackCard
                  key={`${track.title}-${index}`}
                  track={track}
                  number={index + 1}
                />
              ))}
            </div>
          </section>

          {gift.closingMessage && (
            <p className="mt-10 max-w-[38rem] text-[1.05rem] leading-8 text-[var(--body)]">
              {gift.closingMessage}
            </p>
          )}

          {gift.scripture && <ScriptureQuote scripture={gift.scripture} />}
        </div>
      </article>
    </main>
  );
}
