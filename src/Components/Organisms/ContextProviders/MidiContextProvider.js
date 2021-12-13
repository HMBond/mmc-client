import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

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

MidiContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MidiContextProvider;
