import * as React from 'react';

import s from './IconButton.module.scss';

export type IconButtonProps = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => unknown;
};

export function IconButton({ children, onClick }: IconButtonProps) {
  const internalOnClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick && onClick(e);
    },
    [onClick]
  );

  return (
    <button className={s.iconBtn} onClick={internalOnClick}>
      {children}
    </button>
  );
}
