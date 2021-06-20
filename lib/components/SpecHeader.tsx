import * as React from 'react';
import { ArrowLeft } from 'react-feather';
import Link from 'next/link';

import s0 from './SpecHeader.module.scss';

export default function SpecHeader() {
  return (
    <>
      <div className={s0.root}>
        <div className={s0.up}>
          <Link href="/">
            <a className={s0.a}>
              <ArrowLeft size={32} />
            </a>
          </Link>
        </div>
        <div className={s0.down} />
      </div>
    </>
  );
}
