import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from './cx';

interface Props {
  children: ReactNode;
  onClose(): void;
}
export const Modal = ({ children, onClose }: Props) => {
  return createPortal(
    <div
      className={cx(
        'fixed',
        'top-0',
        'left-0',
        'w-full',
        'h-full',
        'bg-black/30',
      )}
      onClick={onClose}
    >
      <div
        className={cx(
          'bg-white',
          'absolute',
          'left-1/2',
          'top-1/2',
          '-translate-1/2',
          'p-3',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>,
    document.getElementById('modal-root')!,
  );
};
