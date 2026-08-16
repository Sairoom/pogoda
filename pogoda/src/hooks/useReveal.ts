import { useEffect, useRef } from 'react';

/**
 * Один общий IntersectionObserver на всю страницу вместо отдельного
 * инстанса под каждый блок: на странице их больше двадцати, и наблюдатели
 * стоят дороже, чем сами анимации.
 */
let shared: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;

  if (!shared) {
    shared = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          shared?.unobserve(entry.target);
        }
      },
      // Порог не задаём: у высоких блоков (доска меню, сетка галереи)
      // процент видимости может не набраться никогда. Вместо этого
      // подрезаем нижнюю границу — блок проявляется, войдя в экран.
      { rootMargin: '0px 0px -12% 0px' }
    );
  }

  return shared;
}

/** Помечает элемент классом `is-visible`, когда он въезжает в вьюпорт. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = getObserver();
    if (!observer) {
      node.classList.add('is-visible');
      return;
    }

    observer.observe(node);
    return () => observer.unobserve(node);
  }, []);

  return ref;
}
