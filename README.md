# Music Gift

Music Gift — статический сайт цифровых музыкальных открыток. Получатель касается NFC-метки смартфоном и открывает персональную страницу с коротким сообщением и музыкой.

Проект не является каталогом или стриминговым сервисом. В нём нет backend, базы данных, CMS и runtime API: страницы собираются заранее и публикуются как статические файлы.

## Целевая архитектура

```text
NFC
 │
 ▼
https://pesnya-tebe.ru/gift/<slug>/
 │
 ▼
GitHub Pages → Next.js static export (HTML, CSS, JS, изображения, metadata)
 │
 └── <audio src="https://media.pesnya-tebe.ru/gifts/<gift>/<file>.mp3">
                                      │
                                      ▼
                              Timeweb Cloud S3
```

Домены являются стабильным публичным слоем над заменяемой инфраструктурой:

```text
pesnya-tebe.ru        → GitHub Pages
media.pesnya-tebe.ru  → Timeweb Cloud S3
```

Production NFC-метки нельзя выпускать с `github.io` URL. В метку записывается только `https://pesnya-tebe.ru/gift/<slug>/`, чтобы в будущем сменить хостинг через DNS без перепрограммирования метки. Аналогично сайт обращается к собственному media-поддомену, а не к техническому адресу S3.

## Стек и структура

- Next.js с App Router;
- TypeScript;
- Tailwind CSS;
- статический export;
- GitHub Pages и GitHub Actions;
- Timeweb Cloud S3 для публичного read-only аудио.

```text
app/                  маршруты, layout и глобальные стили
app/gift/[slug]/      статический маршрут подарка
components/           UI музыкальной открытки
content/gifts/        данные подарков и их реестр
lib/paths.ts          basePath локальных ресурсов приложения
lib/media.ts          построение абсолютных URL внешнего медиа
types/gift.ts         типы Gift, Track, AudioSource и Scripture
public/images/        небольшие локальные обложки
.github/workflows/    публикация на GitHub Pages
```

В GitHub хранятся исходный код, тексты, metadata, конфигурация и небольшие локальные изображения/SVG. В Timeweb S3 хранятся preview, полные аудиозаписи и, при необходимости, другие тяжёлые медиафайлы.

Production MP3 и S3 credentials никогда не должны храниться в Git.

## Локальный запуск

Требуется Node.js 20.9 или новее.

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`. Демонстрационные открытки доступны по адресам `/gift/anxiety/`, `/gift/hardship/` и `/gift/not-alone/`.

S3 не обязателен для локальной разработки. Без `NEXT_PUBLIC_MEDIA_BASE_URL` проект собирается, а трек показывает нейтральный placeholder без создания элемента `<audio>` и сетевого запроса.

Чтобы локально проверить внешний источник, скопируйте `.env.example` в `.env.local` и замените фиктивное значение своим публичным media origin. `.env.local` исключён из Git правилом `.env*`.

## Контент и источники аудио

Новый подарок создаётся без изменения компонентов:

1. Создайте `content/gifts/new-gift.ts` с объектом типа `Gift`.
2. Добавьте объект в массив `gifts` в `content/gifts/index.ts`.
3. Поместите небольшую обложку в `public/images/` и укажите путь `/images/new-gift-cover.svg`.
4. Загрузите аудио в S3 и укажите в контенте только относительный media path.
5. Запустите `npm run build`.

Реестр останавливает сборку при повторяющемся `slug`. Одна модель поддерживает подарок как с одним, так и с несколькими треками.

Для короткого фрагмента:

```ts
{
  mode: "preview",
  title: "Название",
  audioPreview: {
    path: "/gifts/anxiety/01-preview.mp3"
  },
  externalLinks: {
    youtube: "https://..."
  }
}
```

Для полной записи:

```ts
{
  mode: "full",
  title: "Название",
  audioFull: {
    path: "/gifts/not-alone/track.mp3"
  }
}
```

Внешняя ссылка не обязательна в обоих режимах. Фактический адрес формируется только во время сборки:

```text
NEXT_PUBLIC_MEDIA_BASE_URL + AudioSource.path
```

Например, `https://media.example.ru` и `/gifts/not-alone/track.mp3` дают `https://media.example.ru/gifts/not-alone/track.mp3`. `lib/media.ts` нормализует слеши и не использует `NEXT_PUBLIC_BASE_PATH`.

Если media origin или путь отсутствует либо origin не является корректным HTTPS URL, конечный адрес считается недоступным. Компонент не создаёт `<audio src="">` и не делает fallback на локальный `public/audio`.

Нативный HTML5-плеер использует `controls`, `preload="metadata"` и понятный `aria-label`. При запуске одного трека остальные плееры на странице автоматически ставятся на паузу.

Рекомендуемое соглашение для ключей объектов в S3:

```text
gifts/
  anxiety/
    01-preview.mp3
    01-full.mp3
    02-preview.mp3

  hardship/
    01-full.mp3

  not-alone/
    track.mp3
```

Это соглашение об именовании, а не жёсткая структура приложения.

## Переменные сборки

```text
NEXT_PUBLIC_BASE_PATH
```

Задаёт путь самого Next.js-приложения для GitHub project pages, например `/repository`.

```text
SITE_CUSTOM_DOMAIN
```

Определяет production-режим deployment automation. При непустом значении workflow собирает сайт с пустым `NEXT_PUBLIC_BASE_PATH`, чтобы custom domain работал от корня. Переменная не используется для построения URL в TypeScript.

```text
NEXT_PUBLIC_MEDIA_BASE_URL
```

Задаёт публичный origin медиахранилища, например `https://media.example.ru`. Это независимые настройки: `basePath` никогда не добавляется к URL аудио.

`.env.example` содержит только фиктивные значения. Настоящий `.env` не коммитится.

## Проверки и сборка

```bash
npm run lint
npm run build
```

`npm run build` создаёт статический сайт в `out/`. `generateStaticParams()` формирует страницу для каждого зарегистрированного подарка.

Для проверки project page и внешнего медиа в PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH='/repository'
$env:NEXT_PUBLIC_MEDIA_BASE_URL='https://media.example.ru'
npm run build
```

В development неизвестный slug обрабатывается через `notFound()`. После статического export серверного кода нет: GitHub Pages отдаёт общий `out/404.html` с HTTP 404 для неизвестного прямого URL. Исходный URL остаётся в адресной строке, но `generateMetadata()` и `notFound()` на хостинге уже не выполняются. SPA-fallback не используется.

## GitHub Pages и GitHub Actions

Workflow `.github/workflows/deploy.yml` запускается при push в `master`, выполняет lint, статическую сборку и публикует `out/`.

В настройках репозитория выберите **Settings → Pages → Source → GitHub Actions**.

Production site: `https://pesnya-tebe.ru`.

Физический GitHub Pages host: `<username>.github.io/music-gift`.

Пользовательские и NFC-адреса: `https://pesnya-tebe.ru/gift/<slug>/`. Адрес физического host нельзя записывать на NFC.

Создайте GitHub Repository Variable:

```text
SITE_CUSTOM_DOMAIN=pesnya-tebe.ru
```

При её наличии workflow задаёт пустой `NEXT_PUBLIC_BASE_PATH`, поэтому страницы, изображения и Next.js assets обслуживаются от корня custom domain. Если Variable отсутствует, workflow сохраняет прежнюю логику: пустой путь для `<owner>.github.io` или `/<repository>` для project page. Ручная тестовая сборка с `/repository` продолжает поддерживаться.

Создайте необязательную GitHub Repository Variable:

```text
MEDIA_BASE_URL=https://media.pesnya-tebe.ru
```

Workflow передаёт её сборке как `NEXT_PUBLIC_MEDIA_BASE_URL`. Если Variable отсутствует, сборка не падает, а аудиоплееры не создаются. Это Variable, не Secret: адрес публичный. Access Key и Secret Key не нужны GitHub Actions и не должны туда добавляться.

## Первичная настройка Timeweb Cloud S3

1. Создайте S3-бакет в Timeweb Cloud.
2. Выберите Standard storage. Начальный предполагаемый объём проекта — 10 ГБ.
3. Разрешите публичное чтение только необходимых объектов.
4. Создайте поддомен `media.pesnya-tebe.ru`.
5. Привяжите поддомен к бакету согласно актуальным настройкам Timeweb.
6. Включите HTTPS/SSL для media-поддомена.
7. Настройте CORS.
8. Загрузите аудиофайлы по принятому соглашению имён.
9. Проверьте прямое HTTPS-воспроизведение файла через media-поддомен.
10. Задайте публичный origin в `NEXT_PUBLIC_MEDIA_BASE_URL` локально и в Repository Variable `MEDIA_BASE_URL` для GitHub Actions.

Проект не содержит загрузчика, AWS/Timeweb SDK, API записи или удаления объектов. S3 используется только как публичное read-only хранилище. Не сохраняйте Access Key или Secret Key в репозитории, env-примерах или GitHub Variables.

Рекомендуемая production CORS-политика после покупки домена:

```json
{
  "CORSRules": [
    {
      "AllowedMethods": ["GET", "HEAD"],
      "AllowedOrigins": ["https://pesnya-tebe.ru"],
      "AllowedHeaders": ["*"]
    }
  ]
}
```

Для локальной проверки при необходимости добавьте отдельный origin `http://localhost:3000`. Не используйте `*` в `AllowedOrigins` production-конфигурации, когда точный origin сайта известен.

## Подключение собственного домена

В **Repository → Settings → Pages → Custom domain** вручную укажите:

```text
pesnya-tebe.ru
```

При deployment через GitHub Actions отдельный `CNAME`-файл в репозитории не требуется. После проверки DNS включите **Enforce HTTPS**.

DNS для apex domain:

```text
pesnya-tebe.ru  A  185.199.108.153
pesnya-tebe.ru  A  185.199.109.153
pesnya-tebe.ru  A  185.199.110.153
pesnya-tebe.ru  A  185.199.111.153
```

DNS для `www`:

```text
www  CNAME  <username>.github.io
```

Имя репозитория в значение CNAME не добавляется. Домен также следует подтвердить (verify) в GitHub и проверить работу apex/`www` согласно выбранной схеме.

`media.pesnya-tebe.ru → Timeweb Cloud S3` будет настроен отдельной задачей. Для него потребуются привязка к бакету, SSL и CORS с origin `https://pesnya-tebe.ru`.

## Временная страница выезда 2026

Статическая страница события доступна только по прямому адресу `https://pesnya-tebe.ru/event/vyezd-2026/` и не связана с моделью музыкальных подарков.

Необязательные Repository Variables:

```text
NEXT_PUBLIC_EVENT_2026_PHOTOS_URL=
NEXT_PUBLIC_EVENT_2026_REDIRECT_URL=
```

Первая включает кнопку внешнего фотоальбома. Вторая переводит страницу в режим переезда: основной временный контент скрывается и появляется ссылка на постоянную страницу события на церковном сайте. NFC URL при этом остаётся прежним.

## Production checklist

- [x] приобрести собственный домен `pesnya-tebe.ru`;
- [ ] убедиться, что включено автопродление домена;
- [ ] подключить домен к GitHub Pages;
- [ ] проверить HTTPS;
- [ ] создать `media.pesnya-tebe.ru`;
- [ ] подключить media-поддомен к Timeweb S3;
- [ ] настроить SSL для media;
- [ ] настроить CORS;
- [ ] задать `MEDIA_BASE_URL` в GitHub Repository Variables;
- [ ] загрузить тестовый MP3;
- [ ] проверить воспроизведение через мобильный интернет;
- [ ] проверить NFC на физическом смартфоне;
- [ ] только после этого записывать production URL на NFC-метки;
- [ ] после окончательной проверки при необходимости перевести NFC в read-only.

**Production NFC-метки нельзя выпускать с `github.io` URL.** Собственный домен является постоянным публичным идентификатором проекта, а GitHub Pages и S3 — заменяемыми инфраструктурными компонентами.

## Ограничения

- контент добавляется вручную в TypeScript-файлы;
- аудиофайлы загружаются в S3 вручную;
- нет backend, CMS, базы данных, аналитики, авторизации и пользовательских аккаунтов;
- нет private media, signed URLs и управления S3 из приложения;
- нет PWA и офлайн-режима;
- используются нативные возможности HTML5 audio;
- доступность аудио зависит от публичности объекта, DNS, HTTPS и CORS media origin;
- GitHub Pages использует заранее собранные страницы и общий статический 404.
