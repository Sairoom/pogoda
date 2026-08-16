import { navLinks, site } from '../../data/site';
import { Logo } from '../ui/Logo';
import './Footer.scss';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <Logo invert />
          <p className="footer__slogan">{site.slogan}</p>
        </div>

        <nav className="footer__nav" aria-label="Навигация в подвале">
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__contacts">
          <a href={site.mapLink} target="_blank" rel="noreferrer noopener">
            {site.addressFull}
          </a>
          <a href={site.phoneHref}>{site.phone}</a>
        </div>
      </div>

      <div className="footer__bottom container">
        <span>
          © {year} Кофейня «{site.name}»
        </span>
        <span>Не оферта. Цены уточняйте у бариста.</span>
      </div>
    </footer>
  );
}
