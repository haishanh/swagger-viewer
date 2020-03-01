import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import useRemainingViewPortHeight from '../hooks/useRemainingViewPortHeight';
import EnterNewSepcUrl from './EnterNewSepcUrl';
import { X as IconClose } from 'react-feather';
import { useStore, useDispatch } from './Provider';
import Empty from './Empty';

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
        {urls.length > 0 ? (
          <ul className={s0.ul}>
            {urls.map(url => {
              const to = encodeURIComponent(url);
              return (
                <li key={url} className={s0.li}>
                  <span
                    className={s0.rm}
                    style={{ color: '#aaa' }}
                    onClick={() =>
                      dispatch({ type: 'RemoveOneSpec', payload: { url } })
                    }
                  >
                    <IconClose size={16} />
                  </span>
                  <Link to={to}>
                    <h3>{specs[url].title}</h3>
                    <div className={s0.url}>{url}</div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <Empty />
        )}
      </div>

      <FixedTinyFooter />
    </>
  );
}

function FixedTinyFooter() {
  const { isLoggedInGitHub } = useStore();
  const dispatch = useDispatch();
  return (
    <span
      style={{
        position: 'fixed',
        left: 15,
        bottom: 15
      }}
    >
      <a
        className="secondary-link"
        href="https://github.com/haishanh/swagger-viewer"
        target="_blank"
        rel="noopener noreferrer"
      >
        <small>Code</small>
      </a>
      {isLoggedInGitHub ? (
        <>
          <span className={s0.sepTinyFooter}> / </span>
          <button
            className={cx(s0.btnTinyFooter, 'secondary-link')}
            onClick={() => dispatch({ type: 'LogOutGitHub' })}
          >
            Logout
          </button>
        </>
      ) : null}
    </span>
  );
}
