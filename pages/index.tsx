import s from '$styles/Home.module.scss';
import { Og } from '$lib/components/Og';
import VisuallyHidden from '@reach/visually-hidden';
import cx from 'clsx';
import * as React from 'react';
import { X as IconClose } from 'react-feather';
import Link from 'next/link';
import { IconButton } from '$lib/components/base/IconButton';
import { CopyButton } from '$lib/components/SpecList/CopyButton';

import { RegularExpression } from '$lib/misc/constants';
import Empty from '$lib/components/Empty';
import EnterNewSepcUrl from '$lib/components/EnterNewSpecUrl';
import { useDispatch, useStore } from '$lib/components/Provider';
import Tag, { GreenTag, PinkTag, YellowTag } from '$lib/components/Tag';

function getTagFromSpecUrl(url: string) {
  let cap: RegExpMatchArray;
  let ref: string;
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
    label,
  };
}

function SpecListItem({ specs, url, dispatch }) {
  const to = encodeURIComponent(url);
  const tag = getTagFromSpecUrl(url);

  return (
    <li className={s.li}>
      <span className={s.rm}>
        <IconButton
          onClick={() => dispatch({ type: 'RemoveOneSpec', payload: { url } })}
        >
          <VisuallyHidden>Remove this entry</VisuallyHidden>
          <IconClose size={16} />
        </IconButton>
      </span>
      <div className={s.liRight}>
        <Link href={to}>
          <a>
            <div className={s.row1}>
              <h2>{specs[url].title}</h2>
              {tag ? <Tag type={tag.type} label={tag.label} /> : null}
            </div>
          </a>
        </Link>
        <pre className={s.pre}>
          <span>{url}</span>
          <span className={s.copyBtn}>
            <CopyButton provideContent={() => url} />
          </span>
        </pre>
      </div>
    </li>
  );
}

export default function Home() {
  const { specs } = useStore();
  const dispatch = useDispatch();
  const urls = Object.keys(specs);

  return (
    <div className={s.home}>
      <Og />
      <div className={s.top}>
        <EnterNewSepcUrl />
      </div>
      <div className={s.container}>
        {urls.length > 0 ? (
          <ul className={s.ul}>
            {urls.map((url) => (
              <SpecListItem
                url={url}
                dispatch={dispatch}
                specs={specs}
                key={url}
              />
            ))}
          </ul>
        ) : (
          <Empty />
        )}
      </div>

      <FixedTinyFooter />
    </div>
  );
}

function FixedTinyFooter() {
  const { isLoggedInGitHub } = useStore();
  const dispatch = useDispatch();
  return (
    <span style={{ position: 'fixed', left: 15, bottom: 15 }}>
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
          <span className={s.sepTinyFooter}> / </span>
          <button
            className={cx(s.btnTinyFooter, 'secondary-link')}
            onClick={() => dispatch({ type: 'LogOutGitHub' })}
          >
            Logout
          </button>
        </>
      ) : null}
    </span>
  );
}
