import { test } from 'uvu';
import * as assert from 'uvu/assert';

import { extractUrlMeta } from './github.util';

test('extractUrlMeta', () => {
  let ret: ReturnType<typeof extractUrlMeta>;
  ret = extractUrlMeta(
    'https://github.com/facebook/react/blob/master/package.json'
  );
  assert.equal(ret, {
    owner: 'facebook',
    repo: 'react',
    ref: 'master',
    path: 'package.json',
  });

  ret = extractUrlMeta(
    'https://github.com/facebook/react/blob/3c2341416ab3631dffe7a6e525e3cd683c5fa82a/packages/react/src/__tests__/ReactElement-test.js'
  );
  assert.equal(ret, {
    owner: 'facebook',
    repo: 'react',
    ref: '3c2341416ab3631dffe7a6e525e3cd683c5fa82a',
    path: 'packages/react/src/__tests__/ReactElement-test.js',
  });

  ret = extractUrlMeta(
    'https://raw.githubusercontent.com/hello/world/9b9029d1948a1dae9a986c28e27d752b35d7d2ac/docs/api.yaml?token=GQBDZ74Z6AAI44GCZ4GGWUSJCGLA2'
  );
  assert.equal(ret, {
    owner: 'hello',
    repo: 'world',
    ref: '9b9029d1948a1dae9a986c28e27d752b35d7d2ac',
    path: 'docs/api.yaml',
  });

  ret = extractUrlMeta('https://google.com');
  assert.equal(ret, undefined);
});

test.run();
