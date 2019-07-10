import React, { Suspense } from 'react';
import { useDispatch } from './Provider';

import SpecHeader from './SpecHeader';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const { useCallback } = React;

export default function Spec({ match }) {
  const dispatch = useDispatch();
  const url = decodeURIComponent(match.params.id);
  const onComplete = useCallback(
    system => {
      const state = system.getState();
      // const version = state.getIn(['spec', 'json', 'info', 'version']);
      const title = state.getIn(['spec', 'json', 'info', 'title']);
      const url = state.getIn(['spec', 'url']);

      dispatch({ type: 'SpecLoaded', payload: { title, url } });
    },
    [url]
  );

  return (
    <>
      <SpecHeader />
      <SwaggerUI url={url} onComplete={onComplete} />
    </>
  );
}
