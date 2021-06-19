import * as React from 'react';

import {
  getGitHubTokenFromLocalStorageSafely,
  logoutGitHub,
} from '$lib/misc/github';
import { loadState, saveState } from '$lib/misc/storage';

const { createContext, useContext, useReducer } = React;

// {
//   'specs': {
//     'url': {
//       title: string,
//       url: string,
//     },
//   }
// }

const partialInitialState = loadState();
// partialInitialState.allSpecs.push('test');
// partialInitialState.specs.test = {
//   title: 'this is a title',
//   url: 'tset'
// };
const initialState = partialInitialState;
initialState.isLoggedInGitHub = !!getGitHubTokenFromLocalStorageSafely();

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'AddOneSpec':
    case 'SpecLoaded': {
      const { url, title } = payload;
      const { specs, allSpecs } = state;
      if (allSpecs.indexOf(url) >= 0) return state;

      const allSpecsNext = [url, ...allSpecs];
      const specsNext = {
        ...specs,
        [url]: { title, url },
      };

      const statePartialNext = {
        specs: specsNext,
        allSpecs: allSpecsNext,
      };
      // side effect
      saveState(statePartialNext);
      return { ...state, ...statePartialNext };
    }

    case 'RemoveOneSpec': {
      const { url } = payload;
      const { specs, allSpecs } = state;

      const index = allSpecs.indexOf(url);
      const allSpecsNext = [
        ...allSpecs.slice(0, index),
        ...allSpecs.slice(index + 1),
      ];

      const specsNext = { ...specs };
      delete specsNext[url];

      const statePartialNext = {
        specs: specsNext,
        allSpecs: allSpecsNext,
      };
      // side effect
      saveState(statePartialNext);
      return { ...state, ...statePartialNext };
    }

    case 'LogOutGitHub': {
      // side effect
      logoutGitHub();

      return { ...state, isLoggedInGitHub: false };
    }

    default:
      throw new Error(`action type "${type}" not handled`);
  }
}

type State = {
  specs: Record<string, { title: string; url: string }>;
  isLoggedInGitHub?: boolean;
};

const StateContext = createContext<State>({ specs: {} });
const DispatchContext = createContext(null);

export function useStore() {
  return useContext(StateContext);
}

export function useDispatch() {
  return useContext(DispatchContext);
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
