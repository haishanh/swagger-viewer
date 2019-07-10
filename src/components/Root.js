import React, { Suspense } from 'react';
import { Router, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
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
          <Suspense fallback={<Loading height="200px" />} maxDuration={10}>
            <Route exact path="/" component={Home} />
            <Route exact path="/:id" component={Spec} />
          </Suspense>
        </HistoryProvider>
      </Router>
    </Provider>
  </ErrorBoundary>
);

export default hot(Root);
