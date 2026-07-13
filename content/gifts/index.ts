import type { Gift } from "@/types/gift";
import { anxietyGift } from "./anxiety";
import { hardshipGift } from "./hardship";
import { notAloneGift } from "./not-alone";

export const gifts = [anxietyGift, hardshipGift, notAloneGift] as const satisfies readonly Gift[];

const giftsBySlug = new Map<string, Gift>();

for (const gift of gifts) {
  if (giftsBySlug.has(gift.slug)) {
    throw new Error(`Duplicate gift slug: "${gift.slug}"`);
  }

  giftsBySlug.set(gift.slug, gift);
}

export function getGift(slug: string): Gift | undefined {
  return giftsBySlug.get(slug);
}
