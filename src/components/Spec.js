import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from './Provider';

import SpecHeader from './SpecHeader';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const { useCallback } = React;

// const spec = `openapi: 3.0.0\ninfo:\n  title: hello\n  version: 1.0.0\n`;
// spec={spec}

export default function Spec() {
  const dispatch = useDispatch();
  const params = useParams();
  const url = decodeURIComponent(params.id);
  const onComplete = useCallback(
    system => {
      const state = system.getState();
      // const version = state.getIn(['spec', 'json', 'info', 'version']);
      const title = state.getIn(['spec', 'json', 'info', 'title']);
      const url = state.getIn(['spec', 'url']);

      dispatch({ type: 'SpecLoaded', payload: { title, url } });
    },
    [dispatch]
  );

  return (
    <>
      <SpecHeader />
      <SwaggerUI url={url} onComplete={onComplete} />
    </>
  );
}
