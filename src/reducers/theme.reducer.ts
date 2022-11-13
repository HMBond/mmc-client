import { ThemeAction, ThemeState } from '../types/theme.types';

export const reducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_MODE':
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
};
