import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';

type Props = {
  children: ReactNode;
  /** Задержка появления, мс — чтобы элементы въезжали каскадом. */
  delay?: number;
  as?: ElementType;
  className?: string;
};

/** Обёртка, которая проявляет содержимое при попадании в вьюпорт. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: Props) {
  const ref = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={['reveal', className].filter(Boolean).join(' ')}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
