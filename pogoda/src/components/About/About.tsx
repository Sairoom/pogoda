import { gallery } from '../../data/gallery';
import { site } from '../../data/site';
import { Photo } from '../ui/Photo';
import { Reveal } from '../ui/Reveal';
import './About.scss';

const principles = [
  {
    title: 'Своя обжарка',
    text: 'Зерно приезжает небольшими партиями, поэтому в чашке нет горечи — только шоколад и карамель.',
  },
  {
    title: 'Авторские рафы',
    text: 'Дождливый, морской, цитрусовый — рецепты придумали бариста и меняют их вместе с погодой за окном.',
  },
  {
    title: 'Можно засидеться',
    text: 'Розетки у столов, гирлянды, полка с книгами и никто не подгоняет допивать.',
  },
];

const facts = [
  { value: '12+', label: 'сиропов на полке' },
  { value: '4', label: 'сезонных меню в году' },
  { value: '0,4 л', label: 'самый большой стакан' },
  { value: '99 ₽', label: 'эспрессо' },
];

export function About() {
  const collage = [gallery[2], gallery[1], gallery[7]];

  return (
    <section className="about section" id="about">
      <div className="about__inner container">
        <div className="about__text">
          <Reveal>
            <span className="eyebrow">О кофейне</span>
            <h2 className="section-title">
              Маленькая кофейня
              <br />
              с большим стаканом
            </h2>
            <p className="section-lead">
              «Погода» живёт на {site.address} — {site.district}. Здесь варят
              кофе, пекут блины, взбивают молочные коктейли и всерьёз считают,
              что рабочий день без кофейка не начинается.
            </p>
          </Reveal>

          <ul className="about__principles">
            {principles.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 90}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="about__collage" delay={120}>
          {collage.map((photo, index) => (
            <Photo
              key={photo.file}
              photo={photo}
              className={`about__photo about__photo--${index + 1}`}
            />
          ))}
          <span className="about__stamp">
            Мы работаем —<br />вы кайфуете
          </span>
        </Reveal>
      </div>

      <div className="about__facts container">
        {facts.map((fact, index) => (
          <Reveal className="about__fact" key={fact.label} delay={index * 80}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
