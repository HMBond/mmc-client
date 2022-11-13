import { MidiAction, MidiContextState } from '../types/midi.types';
import { send } from '../utils/midi';

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
        send: (midi) => send(midi, action.output, state.socket),
      };
    case 'SET_OUTPUTS':
      return {
        ...state,
        outputs: action.outputs,
      };
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.socket,
        send: (midi) => send(midi, state.output, action.socket),
      };
    default:
      return state;
  }
};
