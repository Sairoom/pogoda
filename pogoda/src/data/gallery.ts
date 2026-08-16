/**
 * Фотографии кофейни.
 *
 * Файлы лежат в `public/images/` — список имён и что на них должно быть
 * описано в `public/images/README.md`. Пока файла нет, компонент `Photo`
 * показывает тёплую заглушку в цвете `tone`, так что вёрстка не «сыпется».
 */
export type Photo = {
  file: string;
  alt: string;
  /** Цвет-заглушка, усреднённый по снимку. */
  tone: string;
  /** Подпись в галерее. */
  caption?: string;
  /** Насколько плитка вытянута в сетке галереи. */
  span?: 'tall' | 'wide';
};

export const imageUrl = (file: string): string =>
  `${process.env.PUBLIC_URL}/images/${file}`;

export const heroPhoto: Photo = {
  file: 'hero-hall.jpg',
  alt: 'Столик у окна с гирляндами и неоновой вывеской Coffee',
  tone: '#221812',
};

export const gallery: Photo[] = [
  {
    file: 'milkshake-grass.jpg',
    alt: 'Молочный коктейль со сливками и шоколадной крошкой в руках',
    tone: '#5c6b3f',
    caption: 'Молочный коктейль с шоколадом',
    span: 'tall',
  },
  {
    file: 'hall-quotes.jpg',
    alt: 'Зал кофейни с надписями «Мы работаем — вы кайфуете» на стене',
    tone: '#3a2b21',
    caption: 'Зал с деревянными столами',
  },
  {
    file: 'cappuccino-heart.jpg',
    alt: 'Капучино с сердечком из ягодной крошки, макаруны на блюдце',
    tone: '#2b201a',
    caption: 'Капучино и макарун',
  },
  {
    file: 'shake-chocolate.jpg',
    alt: 'Шоколадный коктейль со взбитыми сливками и стружкой',
    tone: '#4a3226',
    caption: 'Шоколадный милкшейк',
    span: 'tall',
  },
  {
    file: 'ice-latte-window.jpg',
    alt: 'Айс-латте у входа в кофейню под цветочной аркой',
    tone: '#6b5a75',
    caption: 'Летом — на вынос',
  },
  {
    file: 'ice-cream.jpg',
    alt: 'Мороженое с ягодным и шоколадным сиропом в стакане',
    tone: '#6d6a63',
    caption: 'Мороженое с сиропом',
  },
  {
    file: 'counter.jpg',
    alt: 'Барная стойка с кофемашиной, грифельным меню и витриной',
    tone: '#4b433a',
    caption: 'Наша стойка',
    span: 'wide',
  },
  {
    file: 'syrups.jpg',
    alt: 'Полка с сиропами и авторскими настойками',
    tone: '#8a6a3a',
    caption: 'Больше десяти сиропов',
  },
  {
    file: 'table-cheesecake.jpg',
    alt: 'Чизкейк, чашка кофе и открытая книга на столе',
    tone: '#332720',
    caption: 'Чизкейк и книга',
    span: 'tall',
  },
  {
    file: 'hall-neon.jpg',
    alt: 'Окно кофейни вечером с неоновой вывеской Coffee и гирляндами',
    tone: '#1e1712',
    caption: 'Вечерний свет',
  },
];
