import { Context, createContext, useContext } from 'react';
import { MidiContextProviderValue } from './types/midi.types';
import { StateContextProviderValue } from './types/state.types';

export const MidiContext = createContext<Partial<MidiContextProviderValue>>({});
MidiContext.displayName = 'MidiContext';

export const useMidiContext = () => {
  const midiContext = useContext(MidiContext);
  if (!midiContext) contextError(MidiContext);
  return midiContext as MidiContextProviderValue;
};

export const StateContext = createContext<Partial<StateContextProviderValue>>({});
StateContext.displayName = 'StateContext';

export const useStateContext = () => {
  const stateContext = useContext(StateContext);
  if (!stateContext.state) contextError(StateContext);
  return stateContext as StateContextProviderValue;
};

function contextError(context: Context<any>) {
  throw new Error(
    `Please initialize ${context.displayName}.Provider component with a value before using ${context.displayName}`
  );
}
