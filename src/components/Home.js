import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import useRemainingViewPortHeight from '../hooks/useRemainingViewPortHeight';
import EnterNewSepcUrl from './EnterNewSepcUrl';
import { X as IconClose } from 'react-feather';
import { useStore, useDispatch } from './Provider';
import Empty from './Empty';
import Tag, { GreenTag, YellowTag, PinkTag } from './Tag';

import { RegularExpression } from '../misc/constants';

import s0 from './Home.module.css';

const paddingBottom = 30;

function getTagFromSpecUrl(url) {
  let cap;
  let ref;
  if ((cap = RegularExpression.githubFileUrl.exec(url))) {
    ref = cap[3];
  } else if ((cap = RegularExpression.githubRawFileUrl.exec(url))) {
    ref = cap[1];
  } else {
    return;
  }

  let tagType = PinkTag;
  let label = ref;
  if (ref === 'master') {
    tagType = GreenTag;
  } else if (ref === 'dev' || ref === 'develop' || ref === 'development') {
    tagType = YellowTag;
  } else if (/^[a-z0-9]{12,}$/.test(ref)) {
    label = ref.slice(0, 6);
  }

  return {
    type: tagType,
    label
  };
}

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
              const tag = getTagFromSpecUrl(url);
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
                    <div className={s0.row1}>
                      <h3>{specs[url].title}</h3>
                      {tag ? <Tag type={tag.type} label={tag.label} /> : null}
                    </div>
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
