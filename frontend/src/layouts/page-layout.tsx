import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
export const PageLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};
