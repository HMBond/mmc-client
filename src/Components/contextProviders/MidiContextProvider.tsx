import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import { reducer } from '../../reducers/midi.reducer';
import { MidiContextProps } from '../../types/context.types';
import { MidiContext } from './context';

function MidiContextProvider({ children, socket }: MidiContextProps) {
  const [midi, dispatch] = useReducer(reducer, {
    socket,
    input: null,
    output: null,
    inputs: [],
    outputs: [],
    send: () => {
      return;
    },
  });

  useEffect(() => {
    dispatch({ type: 'SET_SOCKET', socket });
  }, [socket]);

  return <MidiContext.Provider value={[midi, dispatch]}>{children}</MidiContext.Provider>;
}

MidiContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default MidiContextProvider;
