import { heroPhoto } from '../../data/gallery';
import { site } from '../../data/site';
import { Logo } from '../ui/Logo';
import { Photo } from '../ui/Photo';
import './Hero.scss';

export function Hero() {
  return (
    <section className="hero" id="top">
      <Photo photo={heroPhoto} className="hero__bg" eager showLabel={false} />
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__lights" aria-hidden="true" />

      <div className="hero__inner container">
        <p className="hero__kicker">
          {site.city} · {site.address}
        </p>

        <h1 className="hero__title">
          <Logo invert size="lg" />
        </h1>

        <p className="hero__slogan">{site.slogan}</p>

        <p className="hero__lead">
          Маленькая кофейня, где варят на своём зерне, наливают авторские рафы
          и не торопят, когда вы засиделись с книгой.
        </p>

        <div className="hero__actions">
          <a className="hero__btn hero__btn--primary" href="#menu">
            Смотреть меню
          </a>
          <a className="hero__btn" href="#contacts">
            Как нас найти
          </a>
        </div>
      </div>

      <div className="hero__ticker" aria-hidden="true">
        <div className="hero__ticker-track">
          {Array.from({ length: 2 }).map((_, copy) => (
            <span className="hero__ticker-group" key={copy}>
              <span>Мы работаем — вы кайфуете</span>
              <span>Не надо париться, кофе варится</span>
              <span>Нет кофейка — нет работки</span>
              <span>Time for coffee</span>
              <span>Coffee power</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
