import { Dispatch } from 'react';
import { Input, Output } from 'webmidi';

export type MidiAction =
  | { type: 'SET_INPUT'; input: Input | null }
  | { type: 'SET_OUTPUT'; output: Output | null }
  | { type: 'SET_INPUTS'; inputs: Input[] | [] }
  | { type: 'SET_OUTPUTS'; outputs: Output[] | [] };

export type MidiContextState = {
  input: Input | null;
  output: Output | null;
  inputs: Input[] | [];
  outputs: Output[] | [];
};

export type MidiContextProviderValue = {
  midiState: MidiContextState;
  midiDispatch: Dispatch<MidiAction>;
};
