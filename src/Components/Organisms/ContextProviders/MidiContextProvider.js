import React, { createContext, useState } from 'react';

export const MidiContext = createContext(null);

const MidiContextProvider = ({ children }) => {
  const [inputDevice, setInputDevice] = useState({ id: '' });
  const [outputDevice, setOutputDevice] = useState({ id: '' });
  const midiContextProviderValue = {
    inputDevice,
    setInputDevice,
    outputDevice,
    setOutputDevice,
  };

  return (
    <MidiContext.Provider value={midiContextProviderValue}>
      {children}
    </MidiContext.Provider>
  );
};

export default MidiContextProvider;
