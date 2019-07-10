import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import s0 from './SpecHeader.module.css';

// import { useStore } from './Provider';

export default function SpecHeader() {
  return (
    <>
      <div className={s0.root}>
        <div className={s0.up}>
          <Link to="/" className={s0.a}>
            <FiArrowLeft />
          </Link>
        </div>
        <div className={s0.down} />
      </div>
    </>
  );
}
