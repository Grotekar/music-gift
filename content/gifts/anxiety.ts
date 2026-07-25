import type { Gift } from "@/types/gift";

export const anxietyGift: Gift = {
  slug: "anxiety",
  title: "Когда тревожно",
  subtitle: "Можно ненадолго остановиться",
  message: [
    "Тебе не обязательно решить всё прямо сейчас. Пусть эти несколько мелодий станут тихой паузой — местом, где можно выдохнуть и просто побыть.",
  ],
  coverImage: "/images/anxiety-cover.svg",
  theme: "mist",
  tracksIntro: "Эта музыка напомнила мне о том, что рядом может быть тихо.",
  tracks: [
    {
      mode: "preview",
      title: "Тихий воздух",
      artist: "Демонстрационная запись",
      description: "Неспешная мелодия для нескольких спокойных минут.",
    },
    {
      mode: "full",
      title: "Пауза между мыслями",
      artist: "Демонстрационная запись",
      description: "Музыкальное напоминание о том, что спешить не нужно.",
    },
    {
      mode: "preview",
      title: "Свет в окне",
      artist: "Демонстрационная запись",
      description: "Мягкое завершение этой маленькой открытки.",
    },
  ],
  scripture: {
    text: "Довольно для каждого дня своей заботы.",
    reference: "Матфея 6:34",
  },
};
