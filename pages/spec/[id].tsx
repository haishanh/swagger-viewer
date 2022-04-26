import 'swagger-ui-react/swagger-ui.css';

import yaml from 'js-yaml';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

import FileNotFound from '$lib/components/FileNotFound';
import Loading from '$lib/components/Loading';
import { Og } from '$lib/components/Og';
import { useDispatch } from '$lib/components/Provider';
import SpecHeader from '$lib/components/SpecHeader';
import * as b64 from '$lib/misc/b64';
import { getContents } from '$lib/misc/github';
import * as ghUtil from '$lib/utils/github.util';

const { useCallback, useState, useEffect, Suspense } = React;

const SwaggerUI = React.lazy(() => import('swagger-ui-react'));

function buildOgImageUrl(meta: ghUtil.GitHubFileMeta) {
  const qs = new URLSearchParams({
    w: '640',
    h: '320',
    u: '0',
    // max age => one year
    c: '31536000',
    p0: 'ghfl',
    p1: meta.owner,
    p2: meta.repo,
    p3: meta.ref,
    p4: meta.path,
  });
  return `https://imgsvc.vercel.app/image?${qs}`;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params.id as string;
  const url = decodeURIComponent(b64.urlDecode(id));
  const ret = ghUtil.extractUrlMeta(url);
  const ogImageUrl = ret ? buildOgImageUrl(ret) : null;

  return {
    props: {
      ogImageUrl,
      url,
    },
  };
};

// const spec = `openapi: 3.0.0\ninfo:\n  title: hello\n  version: 1.0.0\n`;
// const spec = {
//   openapi: '3.0.0',
//   info: {
//     title: 'hello',
//     version: '1.0.0'
//   }
// };

let githubGetContentsOptions: Partial<ghUtil.GitHubFileMeta> = {};

export default function Spec(props: { ogImageUrl?: string; url?: string }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const url = props.url || decodeURIComponent(b64.urlDecode(router.query.id as string));
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

    let cap = ghUtil.Patten.githubFileUrl.exec(url);
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
    (system: any) => {
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
      <Og title={title} ogImageUrl={props.ogImageUrl} />
      <SpecHeader />
      {swaggerProps.spec || swaggerProps.url ? (
        <Suspense fallback={<Loading height={100} />}>
          <SwaggerUI {...swaggerProps} onComplete={onComplete} />
        </Suspense>
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
