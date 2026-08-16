import { useEffect, useState } from 'react';

/**
 * Возвращает id секции, которая сейчас занимает верхнюю треть экрана,
 * — для подсветки активного пункта в шапке.
 *
 * Замеры собраны в один кадр анимации: без этого `getBoundingClientRect`
 * дёргал бы лейаут на каждое событие скролла.
 */
export function useScrollSpy(ids: string[], offset = 140): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      let current = '';

      for (const id of ids) {
        const section = document.getElementById(id);
        if (!section) continue;
        if (section.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }

      setActive(current);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [ids, offset]);

  return active;
}
