import { MidiAction, MidiContextState } from '../types/midi.types';
import { connectWebSocket } from './midi.reducer.utils';

export const reducer = (state: MidiContextState, action: MidiAction): MidiContextState => {
  switch (action.type) {
    case 'SET_INPUT':
      return {
        ...state,
        input: action.input,
      };
    case 'SET_INPUTS':
      return {
        ...state,
        inputs: action.inputs,
      };
    case 'SET_OUTPUT':
      return {
        ...state,
        output: action.output,
      };
    case 'SET_OUTPUTS':
      return {
        ...state,
        outputs: action.outputs,
      };
    case 'SET_SOCKET':
      return {
        ...state,
        wsPort: action.wsPort,
        socket: connectWebSocket(action.wsPort),
      };
    default:
      return state;
  }
};
