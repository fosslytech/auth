import { Global_Context, Global_Context_Action } from '@ts/global.types';

const noop = () => false;

export const initialState: Global_Context = {
  dispatch: noop,

  content: null, // Will be asigned dynamically later

  redirectTo: '',
};

export const globalReducer = (state: Global_Context, action: Global_Context_Action): Global_Context => {
  switch (action.type) {
    case 'INIT':
      return { ...state, ...action.payload };

    case 'SET_CONTENT':
      return { ...state, content: action.payload };

    case 'SET_REDIRECT':
      return { ...state, redirectTo: action.payload };

    default:
      return state;
  }
};
