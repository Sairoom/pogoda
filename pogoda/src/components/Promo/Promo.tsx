import { gallery } from '../../data/gallery';
import { promo } from '../../data/menu';
import { Photo } from '../ui/Photo';
import { Reveal } from '../ui/Reveal';
import './Promo.scss';

export function Promo() {
  return (
    <section className="promo">
      <div className="promo__inner container">
        <Reveal className="promo__card">
          <span className="promo__badge">Акция</span>
          <h2 className="promo__title">{promo.title}</h2>
          <p className="promo__text">{promo.text}</p>
          <p className="promo__note">{promo.note}</p>
        </Reveal>

        <Reveal className="promo__media" delay={120}>
          <Photo photo={gallery[0]} className="promo__photo" />
          <Photo photo={gallery[3]} className="promo__photo promo__photo--sm" />
        </Reveal>
      </div>
    </section>
  );
}
