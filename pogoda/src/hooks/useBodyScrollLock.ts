import { useEffect } from 'react';

/**
 * Блокирует прокрутку страницы, пока открыт оверлей.
 *
 * Счётчик нужен, чтобы два оверлея (мобильное меню и лайтбокс) не сняли
 * блокировку друг у друга: `overflow` возвращается только когда закрылся
 * последний из них.
 */
let locks = 0;
let restore = '';

export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;

    if (locks === 0) {
      restore = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    locks += 1;

    return () => {
      locks -= 1;
      if (locks === 0) {
        document.body.style.overflow = restore;
      }
    };
  }, [active]);
}
