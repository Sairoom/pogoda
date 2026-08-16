import { useCallback, useEffect, useRef, useState } from 'react';
import { gallery } from '../../data/gallery';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { Photo } from '../ui/Photo';
import { Reveal } from '../ui/Reveal';
import './Gallery.scss';

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const isOpen = openIndex !== null;
  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback((delta: number) => {
    setOpenIndex((current) => {
      if (current === null) return current;
      return (current + delta + gallery.length) % gallery.length;
    });
  }, []);

  useBodyScrollLock(isOpen);

  // Возврат фокуса на плитку, с которой открыли лайтбокс, и удержание
  // табуляции внутри диалога.
  useEffect(() => {
    if (!isOpen) return;

    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key === 'ArrowRight') {
        step(1);
        return;
      }
      if (event.key === 'ArrowLeft') {
        step(-1);
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll('button');
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      opener?.focus?.();
    };
  }, [isOpen, close, step]);

  const opened = openIndex === null ? null : gallery[openIndex];

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <Reveal className="gallery__head">
          <span className="eyebrow">Атмосфера</span>
          <h2 className="section-title">Как у нас</h2>
          <p className="section-lead">
            Гирлянды круглый год, неон в окне, деревянные столы и запах кофе с
            порога. Загляните — и увидите сами.
          </p>
        </Reveal>

        <div className="gallery__grid">
          {gallery.map((photo, index) => (
            <Reveal
              key={photo.file}
              className={[
                'gallery__cell',
                photo.span ? `gallery__cell--${photo.span}` : '',
              ]
                .filter(Boolean)
                .join(' ')}
              delay={(index % 4) * 70}
            >
              <button
                type="button"
                className="gallery__item"
                onClick={() => setOpenIndex(index)}
                aria-label={`Открыть фото: ${photo.alt}`}
              >
                <Photo photo={photo} className="gallery__photo" />
                {photo.caption && (
                  <span className="gallery__caption">{photo.caption}</span>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {opened && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={opened.alt}
          ref={dialogRef}
          onClick={close}
        >
          <button
            className="lightbox__close"
            ref={closeRef}
            onClick={close}
            aria-label="Закрыть"
          >
            ×
          </button>

          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            aria-label="Предыдущее фото"
          >
            ‹
          </button>

          <figure
            className="lightbox__figure"
            onClick={(event) => event.stopPropagation()}
          >
            {/* key заставляет пересобрать картинку: иначе новый файл
                показался бы поверх старого статуса загрузки. */}
            <Photo
              key={opened.file}
              photo={opened}
              className="lightbox__photo"
              eager
            />
            <figcaption>{opened.caption ?? opened.alt}</figcaption>
          </figure>

          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            aria-label="Следующее фото"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
