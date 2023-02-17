import { GlobalContext } from './CTX';
import { useContext } from 'react';
import { ColorScheme, DefaultMantineColor } from '@mantine/core';

const useGlobalCtx = () => {
  const { dispatch, content, redirectTo } = useContext(GlobalContext);

  const translate = (content: string) => content || '<-- untranslated -->';

  const setRedirectTo = (url: string) => dispatch({ type: 'SET_REDIRECT', payload: url });

  return {
    content,
    translate,
    redirectTo,
    setRedirectTo,
  };
};

export default useGlobalCtx;
