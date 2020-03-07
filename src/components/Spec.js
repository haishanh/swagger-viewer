// vim : set ft=javascript :
import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from './Provider';
import { getContents } from '../misc/github';
import yaml from 'js-yaml';

import { RegularExpression } from '../misc/constants';
import FileNotFound from './FileNotFound';
import Loading from './Loading';
import SpecHeader from './SpecHeader';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const { useCallback, useState, useEffect } = React;

// const spec = `openapi: 3.0.0\ninfo:\n  title: hello\n  version: 1.0.0\n`;
// const spec = {
//   openapi: '3.0.0',
//   info: {
//     title: 'hello',
//     version: '1.0.0'
//   }
// };

let githubGetContentsOptions = {};

export default function Spec() {
  const dispatch = useDispatch();
  const params = useParams();
  const url = decodeURIComponent(params.id);
  const [swaggerProps, setSwaggerProps] = useState(() => {
    let cap = RegularExpression.githubFileUrl.exec(url);
    if (!cap) return { url };

    const [, owner, repo, ref, path] = cap;
    githubGetContentsOptions = { owner, repo, ref, path };
    return {};
  });
  const [err, setErr] = useState();
  useEffect(() => {
    if (swaggerProps.url) return;
    getContents(githubGetContentsOptions).then(
      json => {
        const cnt = atob(json.content);
        const spec = yaml.safeLoad(cnt);
        setSwaggerProps({ spec: spec });
      },
      res => {
        if (res.status === 404) {
          setErr({ notFound: githubGetContentsOptions });
        }
      }
    );
  }, [swaggerProps.url]);
  const onComplete = useCallback(
    system => {
      const state = system.getState();
      // state is an immutablejs data
      // const version = state.getIn(['spec', 'json', 'info', 'version']);
      const title = state.getIn(['spec', 'json', 'info', 'title']);
      const specUrl = state.getIn(['spec', 'url']) || url;
      dispatch({ type: 'SpecLoaded', payload: { title, url: specUrl } });
    },
    [dispatch, url]
  );
  return (
    <>
      <SpecHeader />

      {swaggerProps.spec || swaggerProps.url ? (
        <SwaggerUI {...swaggerProps} onComplete={onComplete} />
      ) : !err ? (
        <Loading height={100} />
      ) : err.notFound ? (
        <div
          style={{
            maxWidth: 500,
            margin: '0 auto'
          }}
        >
          <FileNotFound owner={err.notFound.owner} repo={err.notFound.repo} />
        </div>
      ) : null}
    </>
  );
}
