import { Dispatch } from 'react';

export type ColorScheme = 'light' | 'dark';

export type ThemeState = {
  mode: ColorScheme;
};

export type ThemeAction = { type: 'SET_MODE'; mode: ColorScheme };

export type ThemeContextProviderValue = [state: ThemeState, dispatch: Dispatch<ThemeAction>];
