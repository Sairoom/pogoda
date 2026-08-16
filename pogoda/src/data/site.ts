/**
 * Единая точка правды по контактам и текстам «шапки».
 *
 * ⚠️ Поля, отмеченные TODO, взять неоткуда — на фотографиях их нет.
 * Замените их на реальные данные кофейни перед публикацией.
 */
export const site = {
  name: 'Погода',
  tagline: 'Кофе и работка',
  slogan: 'Не надо париться — кофе варится',
  city: 'Москва',
  address: 'Святоозёрская ул., 16',
  addressFull: 'Москва, Святоозёрская ул., 16',
  district: 'Косино-Ухтомский, в двух шагах от Святого озера',
  phone: '+7 (916) 675-65-48',
  phoneHref: 'tel:+79166756548',
  email: 'hello@pogoda-coffee.ru', // TODO
  hours: [
    { days: 'Пн — Пт', time: '08:00 — 22:00' }, // TODO: сверить график
    { days: 'Сб — Вс', time: '09:00 — 22:00' }, // TODO
  ],
  socials: [
    { label: 'Telegram', href: '#' }, // TODO
    { label: 'VK', href: '#' }, // TODO
    { label: 'Яндекс Карты', href: 'https://yandex.ru/maps/?text=Москва, Святоозёрская улица, 16' },
  ],
  mapEmbed:
    'https://yandex.ru/map-widget/v1/?text=' +
    encodeURIComponent('Москва, Святоозёрская улица, 16') +
    '&z=17',
  mapLink:
    'https://yandex.ru/maps/?text=' +
    encodeURIComponent('Москва, Святоозёрская улица, 16'),
} as const;

export type NavLink = { id: string; label: string };

export const navLinks: NavLink[] = [
  { id: 'about', label: 'О нас' },
  { id: 'menu', label: 'Меню' },
  { id: 'gallery', label: 'Атмосфера' },
  { id: 'contacts', label: 'Контакты' },
];
