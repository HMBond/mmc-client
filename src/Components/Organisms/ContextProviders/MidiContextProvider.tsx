import { createContext, useState, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { MidiContextInterface } from '../../../types/interfaces';

export const MidiContext = createContext<MidiContextInterface | null>(null);

type MidiContextProviderProps = { children: ReactNode };

const MidiContextProvider = ({ children }: MidiContextProviderProps) => {
  const [input, setInput] = useState({});
  const [inputs, setInputs] = useState(null);
  const [output, setOutput] = useState({});
  const [outputs, setOutputs] = useState(null);

  // eslint-disable-next-line
  const midiContextProviderValue: MidiContextInterface = {
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
