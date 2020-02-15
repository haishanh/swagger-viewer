import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Loading from './Loading';
import ErrorBoundary from './ErrorBoundary';
import Home from './Home';
import Provider from './Provider';
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

const Root = () => (
  <ErrorBoundary>
    <Provider>
      <Router>
        <Suspense fallback={<Loading height="200px" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:id" element={<Spec />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  </ErrorBoundary>
);

export default Root;
