import { Dispatch } from 'react';
import { Input, Output } from 'webmidi';

export type MidiAction =
  | { type: 'SET_INPUT'; input: Input | null }
  | { type: 'SET_OUTPUT'; output: Output | null }
  | { type: 'SET_INPUTS'; inputs: Input[] | [] }
  | { type: 'SET_OUTPUTS'; outputs: Output[] | [] }
  | { type: 'SET_SOCKET'; wsPort: number };

export type MidiContextState = {
  input: Input | null;
  output: Output | null;
  inputs: Input[] | [];
  outputs: Output[] | [];
  wsPort: number;
  socket: WebSocket | null;
};

export type MidiContextProviderValue = {
  midiState: MidiContextState;
  midiDispatch: Dispatch<MidiAction>;
};
