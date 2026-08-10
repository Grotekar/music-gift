export type EventVideo = {
  id: string;
  title: string;
  videoPath?: string;
  posterPath?: string;
};

const videos = [
  {
    id: "day-1",
    title: "День 1",
    videoPath: "/vyezd/2026/day-1.mp4",
    posterPath: "/vyezd-2026/posters/day-1.webp",
  },
  {
    id: "day-2",
    title: "День 2",
    videoPath: "/vyezd/2026/day-2.mp4",
    posterPath: "/vyezd-2026/posters/day-2.webp",
  },
  {
    id: "day-3",
    title: "День 3",
    videoPath: "/vyezd/2026/day-3.mp4",
    posterPath: "/vyezd-2026/posters/day-3.webp",
  },
  {
    id: "day-4",
    title: "День 4",
    videoPath: "/vyezd/2026/day-4.mp4",
    posterPath: "/vyezd-2026/posters/day-4.webp",
  },
  {
    id: "day-5",
    title: "День 5",
    videoPath: "/vyezd-2026/day-5.mp4",
    posterPath: "/vyezd-2026/posters/day-5.webp",
  },
  {
    id: "day-6",
    title: "День 6",
    videoPath: "/vyezd-2026/day-6.mp4",
    posterPath: "/vyezd-2026/posters/day-6.webp",
  },
] as const satisfies readonly EventVideo[];

export const vyezd2026Content = {
  slug: "vyezd-2026",
  title: "Выезд, который хочется запомнить",
  shortTitle: "Архыз - христианский выезд 2026",
  subtitle: "6 дней рядом",
  seo: {
    title: "Христианский выезд 2026",
    description:
      "Избранные фотографии детского выезда церковной 2026 года.",
  },
  description:
    "Избранные фотографии с христианского выездного богослужения «СИЯЙ 2026». Воспоминания, которые мы создали вместе",
  // TODO: заменить на реальную фотографию для фона Hero, если она должна отличаться от фотографий галереи.
  heroBackground: {
    // Для смещения кадра можно использовать значения вроде "35% center", "left center" или "center top".
    mobilePosition: "51% center",
    position: "center center",
    // src: "/camp2026/hero-arkhyz-2026.webp",
    src: "/camp2026/background.webp",
  },
  actions: {
    gallery: "Смотреть избранное",
    disk: "Скачать все фотографии",
    diskPreview: "Фото на Яндекс Диске",
  },
  sections: {
    thanks: {
      eyebrow: "Спасибо каждому",
      title: "За эти шесть дней",
      text:
        "Ребята, спасибо вам за открытость, смелость, умение не сдаваться и быть настоящими и искренними. \n" +
        "Пусть эта дружба, все ваши достижения и те решения, которые вы приняли, сохранятся в вашем сердце на долгие годы.",
    },
    gallery: {
      eyebrow: "Избранные фото",
      title: "Самые тёплые кадры выезда",
      description:
        "На странице собраны избранные моменты выезда. Полный архив можно будет открыть по ссылке, когда она будет добавлена.",
    },
    video: {
      eyebrow: "Видео дня",
      title: "Видео дня",
      description:
        "Небольшие видео, чтобы снова вспомнить каждый день нашего выезда.",
    },
    final: {
      eyebrow: "До встречи",
      title: "Спасибо, что были с нами",
      text:
        "Сохраните ссылку, чтобы показать родителям, пересмотреть любимые кадры и скачать полный архив фотографий.",
      qrNote: "Место для QR-кода",
    },
  },
  photos: [
    {
      src: "/camp2026/photos/photo-01.svg",
      alt: "Участники выезда на вечерней программе",
      caption: "Вечерняя программа",
      width: 1200,
      height: 1500,
    },
    {
      src: "/camp2026/photos/photo-02.svg",
      alt: "Командная игра на улице",
      caption: "Командные игры",
      width: 1200,
      height: 1500,
    },
    {
      src: "/camp2026/photos/photo-03.svg",
      alt: "Общее фото команды и участников",
      caption: "Все вместе",
      width: 1200,
      height: 1500,
    },
    {
      src: "/camp2026/photos/photo-04.svg",
      alt: "Тихий разговор после встречи",
      caption: "Разговоры без спешки",
      width: 1200,
      height: 1500,
    },
    {
      src: "/camp2026/photos/photo-05.svg",
      alt: "Друзья улыбаются на выезде",
      caption: "Новые друзья",
      width: 1200,
      height: 1500,
    },
    {
      src: "/camp2026/photos/photo-06.svg",
      alt: "Финальный день выезда",
      caption: "Финальный день",
      width: 1200,
      height: 1500,
    },
  ],
  videos,
} as const;
