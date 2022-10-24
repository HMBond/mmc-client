import PropTypes from 'prop-types';
import { useReducer } from 'react';
import { MidiContext } from '../../context';
import { reducer } from '../../reducers/midi.reducer';
import { ContextProps } from '../../types/context.types';

function MidiContextProvider({ children, socket }: ContextProps) {
  const [midiState, midiDispatch] = useReducer(reducer, {
    socket,
    input: null,
    output: null,
    inputs: [],
    outputs: [],
    send: () => {
      return;
    },
  });
  return (
    <MidiContext.Provider value={{ midiState, midiDispatch }}>{children}</MidiContext.Provider>
  );
}

MidiContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default MidiContextProvider;
