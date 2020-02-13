import React, { Suspense } from 'react';
import { Router, Route, Routes } from 'react-router-dom';
import Loading from './Loading';
import ErrorBoundary from './ErrorBoundary';
import Home from './Home';
import Provider from './Provider';
import HistoryProvider, { history } from './HistoryProvider';
import './Root.css';
// import s0 from './Root.module.css';

const Spec = React.lazy(() =>
  import(
    /* webpackChunkName: "spec" */
    /* webpackPrefetch: true */
    /* webpackPreload: true */
    './Spec'
  )
);

window.his = history;

const Root = () => (
  <ErrorBoundary>
    <Provider>
      <Router history={history}>
        <HistoryProvider>
          <Suspense fallback={<Loading height="200px" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Spec />} />
            </Routes>
          </Suspense>
        </HistoryProvider>
      </Router>
    </Provider>
  </ErrorBoundary>
);

export default Root;
