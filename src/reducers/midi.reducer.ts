import { MidiAction, MidiContextState } from '../types/midi.types';

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
    default:
      return state;
  }
};
