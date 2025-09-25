import { type ButtonHTMLAttributes } from 'react';
import { cx } from './cx';
type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, className, ...rest }: Props) => {
  return (
    <button className={cx('p-2', className)} {...rest}>
      {children}
    </button>
  );
};
