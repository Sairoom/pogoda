import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { imageUrl, type Photo as PhotoData } from '../../data/gallery';
import './Photo.scss';

type Status = 'loading' | 'ready' | 'failed';

type Props = {
  photo: PhotoData;
  className?: string;
  /** Не откладывать загрузку — для первого экрана. */
  eager?: boolean;
  /**
   * Подписывать заглушку словом «Погода». Для фоновых картинок выключаем —
   * там надпись читается как случайный артефакт поверх текста.
   */
  showLabel?: boolean;
};

/**
 * Картинка с «тёплой» заглушкой: пока файл грузится (или если его ещё не
 * положили в `public/images/`), плитка залита усреднённым цветом снимка.
 */
export function Photo({
  photo,
  className,
  eager = false,
  showLabel = true,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<Status>('loading');

  // Картинка из кеша успевает загрузиться до того, как React повесит
  // onLoad, — тогда событие не придёт и снимок навсегда останется
  // прозрачным. Поэтому состояние сверяем с `complete` вручную.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (!img.complete) {
      setStatus('loading');
      return;
    }

    setStatus(img.naturalWidth > 0 ? 'ready' : 'failed');
  }, [photo.file]);

  const classes = ['photo', `photo--${status}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={{ '--tone': photo.tone } as CSSProperties}>
      <img
        ref={imgRef}
        src={imageUrl(photo.file)}
        alt={photo.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('failed')}
      />
      {status === 'failed' && showLabel && (
        <span className="photo__fallback" aria-hidden="true">
          Погода
        </span>
      )}
    </div>
  );
}
