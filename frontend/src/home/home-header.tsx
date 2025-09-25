import { cx } from '../commons/cx';

export const HomeHeader = () => {
  return (
    <div
      className={cx(
        'sticky',
        'top-0',
        'left-0',
        'right-0',
        'h-8',
        'p-2',
        'bg-primary',
        'flex items-center',
      )}
    >
      HomeHeader
    </div>
  );
};
