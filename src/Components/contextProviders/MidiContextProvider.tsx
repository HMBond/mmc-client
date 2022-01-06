import { ReactNode, useReducer } from 'react';
import PropTypes from 'prop-types';
import { midiReducer } from '../../state/midiReducer';
import { MidiContext } from '../../state/contexts';

const initialContextState = { input: null, output: null, inputs: [], outputs: [] };

const MidiContextProvider = ({ children }: { children: ReactNode }) => {
  const [midiState, midiDispatch] = useReducer(midiReducer, initialContextState);
  return (
    <MidiContext.Provider value={{ midiState, midiDispatch }}>{children}</MidiContext.Provider>
  );
};

MidiContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default MidiContextProvider;
