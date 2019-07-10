import React from 'react';
import { createHashHistory } from 'history';

const { createContext, useContext } = React;

const HistoryContext = createContext(null);

export const history = createHashHistory();

export function useHistory() {
  return useContext(HistoryContext);
}

export default function HistoryProvider({ children }) {
  return (
    <HistoryContext.Provider value={history}>
      {children}
    </HistoryContext.Provider>
  );
}
