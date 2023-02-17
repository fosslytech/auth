import React, { useEffect, useReducer } from 'react';
import { Global_Context } from '@ts/global.types';
import { initialState, globalReducer } from './reducer';

import { useRouter } from 'next/router';

export const GlobalContext = React.createContext<Global_Context>(initialState);

export const GlobalCTXProvider = ({ children }) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    const url = router.query.redirectTo as string;

    if (!state.redirectTo && url) {
      dispatch({ type: 'SET_REDIRECT', payload: url });
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [router.query]);

  return (
    <GlobalContext.Provider
      value={{
        ...state,

        // Dynamically get initial value for translations
        content: require(`../../../public/locales/${router.locale}/translations.json`),
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
