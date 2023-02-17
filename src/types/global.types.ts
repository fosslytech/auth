import { ColorScheme, DefaultMantineColor, MantineColor } from '@mantine/core';
import { NextPage } from 'next';
import React, { Dispatch } from 'react';
import { ITranslations } from './content.types';

// -----------------------------------------------------------------
// For global context
// -----------------------------------------------------------------

export type Global_Context_Action =
  | Base_Action
  | { type: 'SET_CONTENT'; payload: ITranslations }
  | { type: 'SET_REDIRECT'; payload: string };

export interface Global_Context extends Base_Context<Global_Context_Action> {
  content: ITranslations; // Content fetched from public/locales
  redirectTo: string;
}

// -----------------------------------------------------------------
// Global types
// -----------------------------------------------------------------

export interface Base_Context<Action> {
  dispatch: Dispatch<Action>;
}
export type Base_Action = { type: 'INIT'; payload: any };

export interface IFC {
  children?: React.ReactNode;
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
