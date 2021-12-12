import React, { createContext, useState } from 'react';

export const MidiContext = createContext(null);

const MidiContextProvider = ({ children }) => {
  const [input, setInput] = useState({});
  const [inputs, setInputs] = useState(null);
  const [output, setOutput] = useState({});
  const [outputs, setOutputs] = useState(null);
  const midiContextProviderValue = {
    input,
    setInput,
    inputs,
    setInputs,
    output,
    setOutput,
    outputs,
    setOutputs,
  };

  return (
    <MidiContext.Provider value={midiContextProviderValue}>
      {children}
    </MidiContext.Provider>
  );
};

export default MidiContextProvider;
