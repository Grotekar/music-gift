import type { Gift } from "@/types/gift";

export const notAloneGift: Gift = {
  slug: "not-alone",
  title: "Ты не один",
  subtitle: "Одна песня, которую я выбрал для тебя",
  message: [
    "Я вспомнил о тебе и захотел оставить здесь одну песню. Не как ответ на всё, а как тихое напоминание: даже когда слов мало, тебе не обязательно оставаться со всем этим совсем одному.",
  ],
  coverImage: "/images/nuteki-doroga.jpg",
  theme: "mist",
  tracksIntro: "Эта музыка напомнила мне о том, что рядом может быть тихо.",
  tracks: [
    {
      mode: "full",
      title: "Дорога",
      artist: "Nuteki",
      audioFull: "audio/Nuteki_-_Doroga_47833937.mp3",
      description:
        "Я выбрал её для тех минут, когда нужные слова не находятся, а чьё-то тихое присутствие всё равно важно.",
    },
  ],
  scripture: {
    text: "Господь близок к сокрушённым сердцем.",
    reference: "Псалом 33:19",
  },
};
