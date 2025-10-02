import { type InputHTMLAttributes } from 'react';
import { cx } from './cx';
type Props = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...rest }: Props) => {
  return <input className={cx('p-2', className)} {...rest} />;
};
