import type { ReactNode } from 'react';
import { cx } from '../commons/cx';

interface Props {
  children: ReactNode;
}
export const AppLayout = ({ children }: Props) => {
  return (
    <div
      className={cx(
        'container',
        'border',
        'mx-auto',
        'h-dvh',
        'overflow-y-auto',
      )}
    >
      {children}
    </div>
  );
};
