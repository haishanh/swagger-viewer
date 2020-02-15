import React from 'react';
import { Link } from 'react-router-dom';

import { ArrowLeft } from 'react-feather';

import s0 from './SpecHeader.module.css';

export default function SpecHeader() {
  return (
    <>
      <div className={s0.root}>
        <div className={s0.up}>
          <Link to="/" className={s0.a}>
            <ArrowLeft size={32} />
          </Link>
        </div>
        <div className={s0.down} />
      </div>
    </>
  );
}
