import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';

const rootEl = document.getElementById('app');

const { unstable_createRoot: createRoot } = ReactDOM;

const root = createRoot(rootEl);
root.render(<Root />);
