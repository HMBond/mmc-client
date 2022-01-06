import { createContext, useContext } from 'react';
import { MidiContextProviderValue } from '../types/midi';

export const MidiContext = createContext<Partial<MidiContextProviderValue>>({});
export const useMidiContext = () => {
  const midiContext = useContext(MidiContext);
  if (!midiContext)
    throw Error(
      'Please initialize MidiContext.Provider component with a value before using MidiContext'
    );
  return midiContext as MidiContextProviderValue;
};
