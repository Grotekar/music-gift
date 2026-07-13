import type { Scripture } from "@/types/gift";

export function ScriptureQuote({ scripture }: { scripture: Scripture }) {
  return (
    <figure className="mt-16 border-l border-[var(--accent-soft)] pl-5">
      <blockquote className="font-serif text-lg italic leading-8 text-[var(--body)]">
        «{scripture.text}»
      </blockquote>
      <figcaption className="mt-2 text-xs tracking-[0.12em] text-[var(--muted)] uppercase">
        {scripture.reference}
      </figcaption>
    </figure>
  );
}
