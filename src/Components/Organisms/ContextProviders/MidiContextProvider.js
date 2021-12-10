import React, { useMemo } from 'react';
import { MidiContext } from '../../../context';

const MidiContextProvider = ({ children, inputDevice, outputDevice }) => {
  const midiContextProviderValue = useMemo(
    () => ({ inputDevice, outputDevice }),
    [inputDevice, outputDevice]
  );

  return (
    <MidiContext.Provider value={midiContextProviderValue}>
      {children}
    </MidiContext.Provider>
  );
};

export default MidiContextProvider;
