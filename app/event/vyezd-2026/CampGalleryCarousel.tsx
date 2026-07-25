"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { publicPath } from "@/lib/paths";
import styles from "./vyezd-2026.module.css";

type CampPhoto = {
  alt: string;
  caption: string;
  height: number;
  src: string;
  width: number;
};

type CampGalleryCarouselProps = {
  photos: readonly CampPhoto[];
};

export function CampGalleryCarousel({ photos }: CampGalleryCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const activePhoto =
    activePhotoIndex === null ? null : photos[activePhotoIndex] ?? null;

  const showPhoto = useCallback(
    (direction: -1 | 1) => {
      setActivePhotoIndex((currentIndex) => {
        if (currentIndex === null || photos.length === 0) {
          return currentIndex;
        }

        return (currentIndex + direction + photos.length) % photos.length;
      });
    },
    [photos.length],
  );

  useEffect(() => {
    if (activePhotoIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActivePhotoIndex(null);
      }

      if (event.key === "ArrowRight") {
        showPhoto(1);
      }

      if (event.key === "ArrowLeft") {
        showPhoto(-1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePhotoIndex, showPhoto]);

  function scrollGallery(direction: -1 | 1) {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const slide = carousel.querySelector<HTMLElement>("[data-camp-slide]");
    const gap = 18;
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
    <div className={styles.carouselShell}>
      <p className={styles.gallerySwipeHint}>
        Листай фотографии <span aria-hidden="true">→</span>
      </p>
      <div
        aria-label="Избранные фотографии смены"
        className={styles.carouselViewport}
        id="camp-gallery-carousel"
        ref={carouselRef}
        tabIndex={0}
      >
        {photos.map((photo, index) => (
          <figure
            className={styles.carouselSlide}
            data-camp-slide
            key={photo.src}
          >
            <button
              aria-label={`Открыть фотографию: ${photo.caption}`}
              className={styles.photoOpenButton}
              onClick={() => setActivePhotoIndex(index)}
              type="button"
            >
              <Image
                alt={photo.alt}
                height={photo.height}
                src={publicPath(photo.src)}
                width={photo.width}
              />
            </button>
            <figcaption className={styles.caption}>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <button
        aria-controls="camp-gallery-carousel"
        aria-label="Предыдущая фотография"
        className={`${styles.galleryControl} ${styles.galleryPrev}`}
        onClick={() => scrollGallery(-1)}
        type="button"
      />
      <button
        aria-controls="camp-gallery-carousel"
        aria-label="Следующая фотография"
        className={`${styles.galleryControl} ${styles.galleryNext}`}
        onClick={() => scrollGallery(1)}
        type="button"
      />
      {activePhoto ? (
        <div
          aria-label="Просмотр фотографии"
          aria-modal="true"
          className={styles.lightbox}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setActivePhotoIndex(null);
            }
          }}
          role="dialog"
        >
          <div className={styles.lightboxPanel}>
            <button
              aria-label="Закрыть просмотр"
              autoFocus
              className={styles.lightboxClose}
              onClick={() => setActivePhotoIndex(null)}
              type="button"
            />
            <button
              aria-label="Предыдущая фотография"
              className={`${styles.lightboxControl} ${styles.lightboxPrev}`}
              onClick={() => showPhoto(-1)}
              type="button"
            />
            <figure className={styles.lightboxFigure}>
              <Image
                alt={activePhoto.alt}
                height={activePhoto.height}
                src={publicPath(activePhoto.src)}
                width={activePhoto.width}
              />
              <figcaption className={styles.lightboxCaption}>
                {activePhoto.caption}
              </figcaption>
            </figure>
            <button
              aria-label="Следующая фотография"
              className={`${styles.lightboxControl} ${styles.lightboxNext}`}
              onClick={() => showPhoto(1)}
              type="button"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
