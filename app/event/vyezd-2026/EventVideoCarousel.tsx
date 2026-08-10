"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { EventVideo } from "@/content/events/vyezd-2026";
import styles from "./vyezd-2026.module.css";

type ResolvedEventVideo = Pick<EventVideo, "id" | "title"> & {
  videoUrl?: string;
  posterUrl?: string;
};

type EventVideoCarouselProps = {
  videos: readonly ResolvedEventVideo[];
};

export function EventVideoCarousel({ videos }: EventVideoCarouselProps) {
  const carouselRef = useRef<HTMLUListElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const activeVideo = videos.find(({ id }) => id === activeVideoId);

  const closeVideo = useCallback(() => {
    videoRef.current?.pause();
    setActiveVideoId(null);
  }, []);

  useEffect(() => {
    if (!activeVideo) {
      return;
    }

    const bodyOverflow = document.body.style.overflow;
    const documentOverflow = document.documentElement.style.overflow;
    const trigger = triggerRefs.current.get(activeVideo.id);
    const videoElement = videoRef.current;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeVideo();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const closeButton = closeButtonRef.current;
      const player = videoElement;

      if (!closeButton || !player) {
        return;
      }

      if (event.shiftKey && document.activeElement === closeButton) {
        event.preventDefault();
        player.focus();
      } else if (!event.shiftKey && document.activeElement === player) {
        event.preventDefault();
        closeButton.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      videoElement?.pause();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = documentOverflow;
      window.requestAnimationFrame(() => trigger?.focus());
    };
  }, [activeVideo, closeVideo]);

  function scrollVideos(direction: -1 | 1) {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const slide = carousel.querySelector<HTMLElement>("[data-event-video-slide]");
    const gap = 16;
    const distance = slide
      ? slide.offsetWidth + gap
      : Math.round(carousel.clientWidth * 0.85);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    const edgeTolerance = 4;
    const shouldWrapToStart =
      direction === 1 && carousel.scrollLeft >= maxScrollLeft - edgeTolerance;
    const shouldWrapToEnd =
      direction === -1 && carousel.scrollLeft <= edgeTolerance;

    carousel.scrollTo({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      left: shouldWrapToStart
        ? 0
        : shouldWrapToEnd
          ? maxScrollLeft
          : carousel.scrollLeft + distance * direction,
    });
  }

  return (
    <div className={styles.videoCarouselShell}>
      <p className={styles.gallerySwipeHint}>
        Листай видео <span aria-hidden="true">→</span>
      </p>
      <ul
        aria-label="Видео по дням выезда"
        className={styles.videoViewport}
        id="event-video-carousel"
        ref={carouselRef}
      >
        {videos.map((video) => (
          <li
            className={styles.videoSlide}
            data-event-video-slide
            key={video.id}
          >
            {video.videoUrl ? (
              <button
                aria-label={`Смотреть видео: ${video.title}`}
                className={styles.videoCard}
                onClick={() => setActiveVideoId(video.id)}
                ref={(node) => {
                  if (node) {
                    triggerRefs.current.set(video.id, node);
                  } else {
                    triggerRefs.current.delete(video.id);
                  }
                }}
                type="button"
              >
                <span
                  className={styles.videoPreview}
                  style={
                    video.posterUrl
                      ? { backgroundImage: `url("${video.posterUrl}")` }
                      : undefined
                  }
                >
                  <span className={styles.videoPlayIcon} aria-hidden="true" />
                </span>
                <span className={styles.videoCaption}>{video.title}</span>
              </button>
            ) : (
              <article
                aria-label={`${video.title}. Видео будет добавлено позже`}
                className={`${styles.videoCard} ${styles.videoCardUnavailable}`}
              >
                <span className={styles.videoPreview}>
                  <span
                    className={`${styles.videoPlayIcon} ${styles.videoPlayIconMuted}`}
                    aria-hidden="true"
                  />
                </span>
                <span className={styles.videoCaption}>
                  <strong>{video.title}</strong>
                  <span className={styles.videoPlaceholderText}>
                    Видео будет добавлено позже
                  </span>
                </span>
              </article>
            )}
          </li>
        ))}
      </ul>

      <button
        aria-controls="event-video-carousel"
        aria-label="Предыдущие видео"
        className={`${styles.videoControl} ${styles.videoPrev}`}
        onClick={() => scrollVideos(-1)}
        type="button"
      />
      <button
        aria-controls="event-video-carousel"
        aria-label="Следующие видео"
        className={`${styles.videoControl} ${styles.videoNext}`}
        onClick={() => scrollVideos(1)}
        type="button"
      />

      {activeVideo?.videoUrl ? (
        <div
          aria-labelledby="event-video-dialog-title"
          aria-modal="true"
          className={styles.videoDialog}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeVideo();
            }
          }}
          role="dialog"
        >
          <div className={styles.videoDialogPanel}>
            <div className={styles.videoDialogHeader}>
              <h3 id="event-video-dialog-title">{activeVideo.title}</h3>
              <button
                aria-label="Закрыть видео"
                className={styles.videoDialogClose}
                onClick={closeVideo}
                ref={closeButtonRef}
                type="button"
              />
            </div>
            <video
              aria-label={`Воспроизвести: ${activeVideo.title}`}
              className={styles.videoPlayer}
              controls
              playsInline
              poster={activeVideo.posterUrl}
              preload="metadata"
              ref={videoRef}
              src={activeVideo.videoUrl}
              tabIndex={0}
            >
              Ваш браузер не поддерживает воспроизведение видео.
            </video>
          </div>
        </div>
      ) : null}
    </div>
  );
}
