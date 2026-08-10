import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { vyezd2026Content as eventContent } from "@/content/events/vyezd-2026";
import { getEventVideoUrl } from "@/lib/event-video";
import { publicPath } from "@/lib/paths";
import { CampGalleryCarousel } from "./CampGalleryCarousel";
import { EventVideoCarousel } from "./EventVideoCarousel";
import styles from "./vyezd-2026.module.css";

export const metadata: Metadata = {
  title: eventContent.seo.title,
  description: eventContent.seo.description,
};

function getOptionalHttpsUrl(value: string | undefined): string | undefined {
  const candidate = value?.trim();

  if (!candidate) {
    return undefined;
  }

  try {
    const url = new URL(candidate);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

const eventConfig = {
  photosUrl: getOptionalHttpsUrl(
    process.env.NEXT_PUBLIC_EVENT_2026_PHOTOS_URL,
  ),
  redirectUrl: getOptionalHttpsUrl(
    process.env.NEXT_PUBLIC_EVENT_2026_REDIRECT_URL,
  ),
  feedbackUrl: getOptionalHttpsUrl(
    process.env.NEXT_PUBLIC_EVENT_2026_FEEDBACK_URL,
  ),
} as const;

export default function Vyezd2026Page() {
  if (eventConfig.redirectUrl) {
    return (
      <main className={styles.relocationPage}>
        <section
          aria-labelledby="event-relocation-title"
          className={styles.relocationContent}
        >
          <p className={styles.eyebrow}>Страница события</p>
          <h1 className={styles.title} id="event-relocation-title">
            Христианский выезд 2026
          </h1>
          <p className={styles.lead}>Страница переехала на сайт церкви.</p>
          <a
            className={`${styles.button} ${styles.buttonPrimary}`}
            href={eventConfig.redirectUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Перейти на новую страницу
          </a>
        </section>
      </main>
    );
  }

  const heroStyle = {
    "--camp-hero-image": `url("${publicPath(eventContent.heroBackground.src)}")`,
    "--camp-hero-mobile-position": eventContent.heroBackground.mobilePosition,
    "--camp-hero-position": eventContent.heroBackground.position,
  } as CSSProperties;
  const eventVideos = eventContent.videos.map((video) => ({
    id: video.id,
    title: video.title,
    videoUrl: getEventVideoUrl(video.videoPath),
    posterUrl: getEventVideoUrl(video.posterPath),
  }));

  return (
    <div className={styles.page} style={heroStyle}>
      <header className={styles.hero}>
        <div className={styles.heroVisual} id="top">
          <div className={styles.heroPoster}>
            <a
              aria-label="Перейти к содержанию страницы"
              className={styles.heroScroll}
              href="#camp-hero-content"
            >
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <section className={styles.heroContent} id="camp-hero-content">
          <p className={styles.eyebrow}>{eventContent.subtitle}</p>
          <h1 className={styles.title}>{eventContent.title}</h1>
          <p className={styles.lead}>{eventContent.description}</p>
          <div className={styles.heroActions}>
            {eventConfig.photosUrl ? (
              <a
                className={`${styles.button} ${styles.buttonPrimary}`}
                href={eventConfig.photosUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {eventContent.actions.disk}
              </a>
            ) : (
              <span
                className={`${styles.button} ${styles.buttonPrimary} ${styles.disabledButton}`}
              >
                Архив фотографий будет добавлен
              </span>
            )}
            <a
              className={`${styles.button} ${styles.buttonGhost}`}
              href="#gallery"
            >
              {eventContent.actions.gallery}
            </a>
          </div>
        </section>
      </header>

      <main>
        <section
          aria-labelledby="camp-thanks-title"
          className={`${styles.section} ${styles.thanksSection}`}
        >
          <div>
            <p className={styles.eyebrow}>
              {eventContent.sections.thanks.eyebrow}
            </p>
            <h2 className={styles.sectionTitle} id="camp-thanks-title">
              {eventContent.sections.thanks.title}
            </h2>
          </div>
          <div className={styles.softPanel}>
            <p className={styles.cardText}>{eventContent.sections.thanks.text}</p>
          </div>
        </section>

        <section
          aria-labelledby="camp-gallery-title"
          className={styles.section}
          id="gallery"
        >
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>
              {eventContent.sections.gallery.eyebrow}
            </p>
            <h2 className={styles.sectionTitle} id="camp-gallery-title">
              {eventContent.sections.gallery.title}
            </h2>
            <p className={styles.sectionText}>
              {eventContent.sections.gallery.description}
            </p>
          </div>

          <CampGalleryCarousel photos={eventContent.photos} />
        </section>

        <section
          aria-labelledby="camp-video-title"
          className={styles.section}
          id="videos"
        >
          <div className={styles.sectionHeader}>
            <p className={styles.eyebrow}>
              {eventContent.sections.video.eyebrow}
            </p>
            <h2 className={styles.sectionTitle} id="camp-video-title">
              {eventContent.sections.video.title}
            </h2>
            <p className={styles.sectionText}>
              {eventContent.sections.video.description}
            </p>
          </div>

          <EventVideoCarousel videos={eventVideos} />
        </section>

        {eventConfig.feedbackUrl ? (
          <section
            aria-labelledby="camp-feedback-title"
            className={`${styles.section} ${styles.feedbackSection}`}
          >
            <div className={styles.feedbackPanel}>
              <p className={styles.eyebrow}>
                {eventContent.sections.feedback.eyebrow}
              </p>
              <h2 className={styles.feedbackTitle} id="camp-feedback-title">
                {eventContent.sections.feedback.title}
              </h2>
              <p className={styles.sectionText}>
                {eventContent.sections.feedback.text}
              </p>
              <a
                className={`${styles.button} ${styles.buttonPrimary} ${styles.feedbackAction}`}
                href={eventConfig.feedbackUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                {eventContent.sections.feedback.action}
              </a>
            </div>
          </section>
        ) : null}

        <section
          aria-labelledby="camp-final-title"
          className={styles.finalSection}
        >
          <div className={styles.finalPanel}>
            <p className={styles.eyebrow}>
              {eventContent.sections.final.eyebrow}
            </p>
            <h2 className={styles.sectionTitle} id="camp-final-title">
              {eventContent.sections.final.title}
            </h2>
            <p className={styles.sectionText}>{eventContent.sections.final.text}</p>
            {eventConfig.photosUrl ? (
              <a
                className={`${styles.button} ${styles.buttonPrimary}`}
                href={eventConfig.photosUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Открыть Яндекс Диск
              </a>
            ) : (
              <span
                className={`${styles.button} ${styles.buttonPrimary} ${styles.disabledButton}`}
              >
                Ссылка на Яндекс Диск будет добавлена
              </span>
            )}
          </div>
        </section>
      </main>

    </div>
  );
}
