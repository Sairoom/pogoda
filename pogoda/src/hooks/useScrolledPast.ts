import { useEffect, useState } from 'react';

/** Прокручена ли страница дальше `offset` пикселей — для «залипшей» шапки. */
export function useScrolledPast(offset = 24): boolean {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      setPassed(window.scrollY > offset);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
    };
  }, [offset]);

  return passed;
}
