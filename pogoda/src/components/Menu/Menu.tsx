import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { addons, menu } from '../../data/menu';
import { Reveal } from '../ui/Reveal';
import './Menu.scss';

export function Menu() {
  const [activeId, setActiveId] = useState(menu[0].id);
  const tablistRef = useRef<HTMLDivElement>(null);

  const activeIndex = Math.max(
    0,
    menu.findIndex((item) => item.id === activeId)
  );
  const category = menu[activeIndex];
  const showVolumeHeader = category.volumes.length > 1;

  /** Стрелки, Home и End переключают вкладки — как ждёт того паттерн tablist. */
  const selectByOffset = (target: number) => {
    const next = (target + menu.length) % menu.length;
    setActiveId(menu[next].id);
    tablistRef.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  };

  const onTablistKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowRight: activeIndex + 1,
      ArrowLeft: activeIndex - 1,
      Home: 0,
      End: menu.length - 1,
    };

    const target = moves[event.key];
    if (target === undefined) return;

    event.preventDefault();
    selectByOffset(target);
  };

  return (
    <section className="menu section section--dark" id="menu">
      <div className="menu__inner container">
        <Reveal className="menu__head">
          <span className="eyebrow">Меню</span>
          <h2 className="section-title">Что налить?</h2>
          <p className="section-lead">
            Полная карта с грифельных досок в зале. Сезонное меню меняется
            четыре раза в год — вслед за погодой.
          </p>
        </Reveal>

        <Reveal className="menu__tabs" delay={80}>
          <div
            role="tablist"
            aria-label="Категории меню"
            ref={tablistRef}
            onKeyDown={onTablistKeyDown}
          >
            {menu.map((item) => (
              <button
                key={item.id}
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={item.id === activeId}
                aria-controls={`panel-${item.id}`}
                tabIndex={item.id === activeId ? 0 : -1}
                className={
                  item.id === activeId ? 'menu__tab is-active' : 'menu__tab'
                }
                onClick={() => setActiveId(item.id)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal className="menu__board" delay={140}>
          <div
            className="menu__panel"
            role="tabpanel"
            id={`panel-${category.id}`}
            aria-labelledby={`tab-${category.id}`}
            key={category.id}
          >
            <div className="menu__panel-head">
              <h3>{category.title}</h3>
              <p>{category.caption}</p>
            </div>

            {showVolumeHeader && (
              <div className="menu__row menu__row--head" aria-hidden="true">
                <span className="menu__name" />
                <span className="menu__prices">
                  {category.volumes.map((volume) => (
                    <span key={volume}>{volume}</span>
                  ))}
                </span>
              </div>
            )}

            <ul className="menu__list">
              {category.items.map((item) => (
                <li className="menu__row" key={item.name}>
                  <span className="menu__name">
                    {item.name}
                    {item.note && <em>{item.note}</em>}
                  </span>
                  <span className="menu__prices">
                    {item.prices.map((price, index) => (
                      <span
                        key={category.volumes[index] ?? index}
                        className={price === null ? 'is-empty' : undefined}
                      >
                        {price === null ? '—' : `${price} ₽`}
                      </span>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="menu__addons">
            <h3>Дополнительно</h3>
            <p className="menu__addons-price">{addons.price} ₽ за штуку</p>
            <ul>
              {addons.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </Reveal>

        <Reveal className="menu__footnote" delay={180}>
          <p>
            Все напитки готовим и на альтернативном молоке — кокосовом,
            миндальном или банановом.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
