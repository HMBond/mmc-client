import { ReactNode, useReducer } from 'react';
import PropTypes from 'prop-types';
import { reducer } from '../../reducers/midi.reducer';
import { MidiContext } from '../../context';

const initialContextState = { input: null, output: null, inputs: [], outputs: [] };

const MidiContextProvider = ({ children }: { children: ReactNode }) => {
  const [midiState, midiDispatch] = useReducer(reducer, initialContextState);
  return (
    <MidiContext.Provider value={{ midiState, midiDispatch }}>{children}</MidiContext.Provider>
  );
};

MidiContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default MidiContextProvider;
