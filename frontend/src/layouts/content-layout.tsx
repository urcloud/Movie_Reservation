import type { ReactNode } from 'react';
import { cx } from '../commons/cx';

interface Props {
  children: ReactNode;
}
export const ContentLayout = ({ children }: Props) => {
  return <div className={cx('px-2')}>{children}</div>;
};
