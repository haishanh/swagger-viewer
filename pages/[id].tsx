// vim : set ft=javascript :
import 'swagger-ui-react/swagger-ui.css';

import { GetServerSideProps } from 'next';
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      id: context.params?.id,
    },
  };
};

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
  const dispatch = useDispatch();
  const url = props.id;
  // const params = useParams();
  // const url = decodeURIComponent(params.id);
  const [swaggerProps, setSwaggerProps] = useState<{
    url?: string;
    spec?: string;
  }>(() => {
    let cap = RegularExpression.githubFileUrl.exec(url);
    if (!cap) return { url };

    const [, owner, repo, ref, path] = cap;
    githubGetContentsOptions = { owner, repo, ref, path };
    return {};
  });
  const [err, setErr] = useState<{
    notFound: typeof githubGetContentsOptions;
  }>();
  const [title, setTitle] = useState();
  useEffect(() => {
    if (swaggerProps.url) return;
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
  }, [swaggerProps.url]);
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
        <div
          style={{
            maxWidth: 500,
            margin: '0 auto',
          }}
        >
          <FileNotFound owner={err.notFound.owner} repo={err.notFound.repo} />
        </div>
      ) : null}
    </>
  );
}
