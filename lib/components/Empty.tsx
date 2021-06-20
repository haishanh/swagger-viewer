import { useRouter } from 'next/router';
import * as React from 'react';
import { Ghost } from 'react-kawaii';

import Button from './Button';
import s from './Empty.module.css';

const url = 'https://httpbin.org/spec.json';

function Empty() {
  const router = useRouter();
  const navToHttpBinSepc = () => {
    const to = '/spec/' + encodeURIComponent(url);
    router.push(to);
  };
  return (
    <>
      <div className={s.ghost}>
        <Ghost size={160} mood="sad" color="#f2f2f2" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <h3>No swagger specs yet</h3>
        <p>
          Try add the spec below which is from the great{' '}
          <a
            href="https://httpbin.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            httpbin.org
          </a>
        </p>
        <pre className={s.pre}>https://httpbin.org/spec.json</pre>
        <Button onClick={navToHttpBinSepc}>Add</Button>
      </div>
    </>
  );
}

export default Empty;
