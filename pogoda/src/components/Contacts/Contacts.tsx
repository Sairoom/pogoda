import { site } from '../../data/site';
import { Reveal } from '../ui/Reveal';
import './Contacts.scss';

export function Contacts() {
  return (
    <section className="contacts section section--dark" id="contacts">
      <div className="contacts__inner container">
        <div className="contacts__info">
          <Reveal>
            <span className="eyebrow">Контакты</span>
            <h2 className="section-title">Заходите на кофе</h2>
            <p className="section-lead">{site.district}.</p>
          </Reveal>

          <Reveal className="contacts__grid" delay={90}>
            <div className="contacts__block">
              <h3>Адрес</h3>
              <p className="contacts__address">{site.addressFull}</p>
            </div>

            <div className="contacts__block">
              <h3>Часы работы</h3>
              <ul className="contacts__hours">
                {site.hours.map((row) => (
                  <li key={row.days}>
                    <span>{row.days}</span>
                    <b>{row.time}</b>
                  </li>
                ))}
              </ul>
            </div>

            <div className="contacts__block">
              <h3>Связаться</h3>
              <a className="contacts__phone" href={site.phoneHref}>
                {site.phone}
              </a>
              <a className="contacts__email" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>

            <div className="contacts__block">
              <h3>Мы в сети</h3>
              <ul className="contacts__socials">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <a
              className="contacts__route"
              href={site.mapLink}
              target="_blank"
              rel="noreferrer noopener"
            >
              Построить маршрут
            </a>
          </Reveal>
        </div>

        <Reveal className="contacts__map" delay={120}>
          <iframe
            src={site.mapEmbed}
            title={`Карта: ${site.addressFull}`}
            loading="lazy"
            allowFullScreen
          />
        </Reveal>
      </div>
    </section>
  );
}
