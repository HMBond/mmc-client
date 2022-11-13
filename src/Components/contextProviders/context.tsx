import { Context, createContext, useContext } from 'react';
import { MidiContextProviderValue } from '../../types/midi.types';
import { StateContextProviderValue } from '../../types/state.types';
import { ThemeContextProviderValue } from '../../types/theme.types';

export const MidiContext = createContext<Partial<MidiContextProviderValue>>([]);
MidiContext.displayName = 'MidiContext';

export const useMidiContext = () => {
  const result = useContext(MidiContext);
  if (!result) contextError(MidiContext);
  return result as MidiContextProviderValue;
};

export const StateContext = createContext<Partial<StateContextProviderValue>>([]);
StateContext.displayName = 'StateContext';

export const useStateContext = () => {
  const result = useContext(StateContext);
  if (!result) contextError(StateContext);
  return result as StateContextProviderValue;
};

export const ThemeContext = createContext<Partial<ThemeContextProviderValue>>([]);
ThemeContext.displayName = 'ThemeContext';

export const useThemeContext = () => {
  const result = useContext(ThemeContext);
  if (!result) contextError(ThemeContext);
  return result as ThemeContextProviderValue;
};

function contextError(context: Context<any>) {
  throw new Error(
    `Please initialize ${context.displayName}.Provider component with a value before using ${context.displayName}`
  );
}
