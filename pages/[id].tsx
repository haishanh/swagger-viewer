import 'swagger-ui-react/swagger-ui.css';
import { useRouter } from 'next/router';
import yaml from 'js-yaml';
import * as React from 'react';

import { Og } from '$lib/components/Og';
import FileNotFound from '$lib/components/FileNotFound';
import Loading from '$lib/components/Loading';
import { useDispatch } from '$lib/components/Provider';
import SpecHeader from '$lib/components/SpecHeader';
import * as b64 from '$lib/misc/b64';
import { RegularExpression } from '$lib/misc/constants';
import { getContents } from '$lib/misc/github';
import SwaggerUI from 'swagger-ui-react';

const { useCallback, useState, useEffect } = React;

// const spec = `openapi: 3.0.0\ninfo:\n  title: hello\n  version: 1.0.0\n`;
// const spec = {
//   openapi: '3.0.0',
//   info: {
//     title: 'hello',
//     version: '1.0.0'
//   }
// };

let githubGetContentsOptions: {
  owner?: string;
  repo?: string;
  ref?: string;
  path?: string;
} = {};

export default function Spec(props: { id?: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const url = router.query.id as string;
  const [swaggerProps, setSwaggerProps] = useState<{
    url?: string;
    spec?: string;
  }>({});
  const [err, setErr] = useState<{
    notFound: typeof githubGetContentsOptions;
  }>();
  const [title, setTitle] = useState();
  useEffect(() => {
    if (!url) return;

    let cap = RegularExpression.githubFileUrl.exec(url);
    if (!cap) {
      setSwaggerProps({ url });
      return;
    }
    const [, owner, repo, ref, path] = cap;
    const githubGetContentsOptions = { owner, repo, ref, path };
    getContents(githubGetContentsOptions).then(
      (json) => {
        const cnt = b64.decode(json.content);
        const spec = yaml.load(cnt) as string;
        setSwaggerProps({ spec });
      },
      (res) => {
        if (res.status === 404) {
          setErr({ notFound: githubGetContentsOptions });
        }
      }
    );
  }, [swaggerProps.url, url]);
  const onComplete = useCallback(
    (system) => {
      const state = system.getState();
      // state is an immutablejs data
      // const version = state.getIn(['spec', 'json', 'info', 'version']);
      const title = state.getIn(['spec', 'json', 'info', 'title']);
      const specUrl = state.getIn(['spec', 'url']) || url;
      if (dispatch) {
        dispatch({ type: 'SpecLoaded', payload: { title, url: specUrl } });
      }
      setTitle(title);
    },
    [dispatch, url, setTitle]
  );
  return (
    <>
      <Og title={title} />
      <SpecHeader />
      {swaggerProps.spec || swaggerProps.url ? (
        <SwaggerUI {...swaggerProps} onComplete={onComplete} />
      ) : !err ? (
        <Loading height={100} />
      ) : err.notFound ? (
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <FileNotFound owner={err.notFound.owner} repo={err.notFound.repo} />
        </div>
      ) : null}
    </>
  );
}
