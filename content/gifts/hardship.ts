import type { Gift } from "@/types/gift";

export const hardshipGift: Gift = {
  slug: "hardship",
  title: "Когда тяжело",
  subtitle: "Эту открытку можно просто оставить рядом",
  message:
    "Я не знаю слов, которые могли бы всё исправить. Но хочу, чтобы ты помнил: твою боль не нужно обесценивать, и тебе не обязательно проходить через неё в одиночку.",
  coverImage: "/images/hardship-cover.svg",
  theme: "earth",
  tracks: [
    {
      mode: "full",
      title: "Шаг за шагом",
      artist: "Демонстрационная запись",
      description: "Спокойная композиция без обещаний и поспешных ответов.",
    },
    {
      mode: "preview",
      title: "Рядом",
      artist: "Демонстрационная запись",
      description: "О том, что иногда присутствие важнее правильных слов.",
    },
    {
      mode: "preview",
      title: "После долгого дня",
      artist: "Демонстрационная запись",
      description: "Тихая надежда, которой не нужно торопить завтрашний день.",
    },
  ],
  scripture: {
    text: "Господь близок к сокрушённым сердцем.",
    reference: "Псалом 33:19",
  },
};
