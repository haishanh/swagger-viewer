import * as React from 'react';

import { getGitHubTokenFromLocalStorageSafely, logoutGitHub } from '$lib/misc/github';
import { initialState, loadState, saveState } from '$lib/misc/storage';

const { createContext, useContext, useReducer, useEffect } = React;

type State = {
  allSpecs?: string[];
  specs: Record<string, { title: string; url: string }>;
  isLoggedInGitHub?: boolean;
  loaded?: boolean;
};

function loadInitialState() {
  const partialInitialState = loadState();
  const s = { ...partialInitialState };
  s.isLoggedInGitHub = !!getGitHubTokenFromLocalStorageSafely();
  s.loaded = true;
  return s;
}

function reducer(state: State, action: { type: string; payload: any }) {
  const { type, payload } = action;
  switch (type) {
    case 'Init': {
      return loadInitialState();
    }

    case 'AddOneSpec':
    case 'SpecLoaded': {
      const { url, title } = payload;
      if (!url) return state;

      const { specs, allSpecs } = state;

      let allSpecsNext = [...allSpecs];

      const currIdx = allSpecs.indexOf(url);
      if (currIdx >= 0) {
        allSpecsNext.splice(currIdx, 0, url);
      } else {
        allSpecsNext = [url, ...allSpecs];
      }

      const specsNext = { ...specs, [url]: { title, url } };

      const statePartialNext = { specs: specsNext, allSpecs: allSpecsNext };
      // side effect
      saveState(statePartialNext);
      return { ...state, ...statePartialNext };
    }

    case 'RemoveOneSpec': {
      const { url } = payload;
      const { specs, allSpecs } = state;

      const index = allSpecs.indexOf(url);
      const allSpecsNext = [...allSpecs.slice(0, index), ...allSpecs.slice(index + 1)];

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

const StateContext = createContext<State>({ specs: {} });
const DispatchContext = createContext(null);

export function useStore() {
  return useContext(StateContext);
}

export function useDispatch() {
  return useContext(DispatchContext);
}

function Init({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'Init' });
  }, [dispatch]);

  return <>{children}</>;
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Init>{children}</Init>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
