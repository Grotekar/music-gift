import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GiftPage } from "@/components/GiftPage";
import { getGift, gifts } from "@/content/gifts";

type GiftRouteProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return gifts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GiftRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const gift = getGift(slug);

  if (!gift) {
    return { title: "Подарок не найден — Music Gift" };
  }

  return {
    title: `${gift.title} — Music Gift`,
    description: gift.subtitle ?? "Персональная музыкальная открытка.",
  };
}

export default async function GiftRoute({ params }: GiftRouteProps) {
  const { slug } = await params;
  const gift = getGift(slug);

  if (!gift) notFound();

  return <GiftPage gift={gift} />;
}
