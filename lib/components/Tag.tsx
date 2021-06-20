import * as React from 'react';

import s from './Tag.module.css';

// const { useState, useEffect, useCallback } = React;

export const GreenTag = 1;
export const YellowTag = 2;
export const PinkTag = 3;

const colors = {
  [GreenTag]: {
    f: '#14551B',
    b: '#ADF29B',
  },
  [YellowTag]: {
    f: '#65670F',
    b: '#E6E97B',
  },
  [PinkTag]: {
    f: '#6C0E58',
    b: '#FFAAD3',
  },
};

function Tag({ type, label }) {
  const c = colors[type];
  const style = {
    color: c.f,
    background: c.b,
  };
  return (
    <span className={s.tag} style={style}>
      {label}
    </span>
  );
}

export default Tag;
