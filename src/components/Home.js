import React from 'react';
import { Link } from 'react-router-dom';
import useRemainingViewPortHeight from '../hooks/useRemainingViewPortHeight';
import EnterNewSepcUrl from './EnterNewSepcUrl';
import { FiX } from 'react-icons/fi';
import { useStore, useDispatch } from './Provider';

// const { useCallback } = React;

import s0 from './Home.module.css';

const paddingBottom = 30;

export default function Home() {
  const { specs } = useStore();
  const dispatch = useDispatch();
  const urls = Object.keys(specs);
  const [refContainer, containerHeight] = useRemainingViewPortHeight();

  return (
    <>
      <EnterNewSepcUrl />
      <div
        className={s0.container}
        ref={refContainer}
        style={{
          height: containerHeight - paddingBottom,
          paddingBottom
        }}
      >
        <ul className={s0.ul}>
          {urls.map(url => {
            const to = encodeURIComponent(url);
            return (
              <li key={url} className={s0.li}>
                <div
                  className={s0.rm}
                  style={{ color: '#aaa' }}
                  onClick={() =>
                    dispatch({ type: 'RemoveOneSpec', payload: { url } })
                  }
                >
                  <FiX />
                </div>
                <Link to={to}>
                  <h3>{specs[url].title}</h3>
                  <div className={s0.url}>{url}</div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
