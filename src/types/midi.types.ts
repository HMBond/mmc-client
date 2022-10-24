import { Dispatch } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Input, Output } from 'webmidi';

export interface MidiMessage {
  type: 'note' | 'pitchbend';
  channel: number;
}

export type NoteMessage = MidiMessage & {
  type: 'note';
  action: 'stop' | 'play';
  note: string;
  velocity?: number;
};

export type PitchbendMessage = MidiMessage & {
  type: 'pitchbend';
  value: number;
};

export type MidiAction =
  | { type: 'SET_INPUT'; input: Input | null }
  | { type: 'SET_OUTPUT'; output: Output | null }
  | { type: 'SET_INPUTS'; inputs: Input[] }
  | { type: 'SET_OUTPUTS'; outputs: Output[] };

export type MidiContextState = {
  input: Input | null;
  output: Output | null;
  inputs: Input[];
  outputs: Output[];
  socket: ReconnectingWebSocket | null;
  send: (message: MidiMessage) => void;
};

export type MidiContextProviderValue = {
  midiState: MidiContextState;
  midiDispatch: Dispatch<MidiAction>;
};
