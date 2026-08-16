import { useEffect, useState } from 'react';
import { navLinks, site } from '../../data/site';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useScrolledPast } from '../../hooks/useScrolledPast';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { Logo } from '../ui/Logo';
import './Header.scss';

const sectionIds = navLinks.map((link) => link.id);

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolledPast(24);
  const active = useScrollSpy(sectionIds);

  useBodyScrollLock(menuOpen);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header
      className={[
        'header',
        scrolled ? 'header--scrolled' : '',
        menuOpen ? 'header--open' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="header__inner container">
        <a
          className="header__logo"
          href="#top"
          onClick={() => setMenuOpen(false)}
          aria-label={`${site.name} — на главную`}
        >
          <Logo invert size="sm" />
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? 'true' : undefined}
              className={
                active === link.id ? 'header__link is-active' : 'header__link'
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={site.phoneHref}>
            {site.phone}
          </a>
          <a className="header__cta" href="#contacts">
            Как добраться
          </a>
        </div>

        <button
          className="header__burger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="header__drawer" id="mobile-menu" hidden={!menuOpen}>
        <nav aria-label="Мобильная навигация">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a className="header__drawer-phone" href={site.phoneHref}>
          {site.phone}
        </a>
        <p className="header__drawer-address">{site.addressFull}</p>
      </div>
    </header>
  );
}
