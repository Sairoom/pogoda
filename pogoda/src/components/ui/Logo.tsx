import { site } from '../../data/site';
import './Logo.scss';

type Props = {
  /** Светлый вариант — для тёмной шапки и футера. */
  invert?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

/** Рукописный вордмарк, повторяющий вывеску кофейни. */
export function Logo({ invert = false, size = 'md' }: Props) {
  const classes = [
    'logo',
    `logo--${size}`,
    invert ? 'logo--invert' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      <span className="logo__word">{site.name}</span>
      <span className="logo__tagline">{site.tagline}</span>
    </span>
  );
}
