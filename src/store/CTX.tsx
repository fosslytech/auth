import { IFC } from '@ts/global.types';
import React from 'react';
import { GlobalCTXProvider } from './global/CTX';

const JoinedCTXProvider: React.FC<IFC> = ({ children }) => {
  return <GlobalCTXProvider>{children}</GlobalCTXProvider>;
};

export default JoinedCTXProvider;
