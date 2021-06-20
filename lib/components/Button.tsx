import cx from 'clsx';
import * as React from 'react';

import s0 from './Button.module.scss';

const { memo, forwardRef, useCallback } = React;

function Button(props, ref) {
  const { onClick, isLoading, kind = 'primary', ...restProps } = props;
  const internalOnClick = useCallback(
    (e) => {
      if (isLoading) return;
      onClick && onClick(e);
    },
    [isLoading, onClick]
  );
  const btnClassName = cx(s0.btn, {
    [s0.minimal]: kind === 'minimal',
  });
  return (
    <button className={btnClassName} ref={ref} onClick={internalOnClick}>
      <ButtonInternal {...restProps} />
    </button>
  );
}

function ButtonInternal({ children, label, text, start }) {
  return (
    <>
      {start ? (
        <span className={s0.btnStart}>
          {typeof start === 'function' ? start() : start}
        </span>
      ) : null}
      {children || label || text}
    </>
  );
}

export default memo(forwardRef(Button));
