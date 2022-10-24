import ReconnectingWebSocket from 'reconnecting-websocket';
import { Output } from 'webmidi';
import { MidiMessage, NoteMessage, PitchbendMessage } from '../types/midi.types';

export function send(
  midi: MidiMessage,
  socket: ReconnectingWebSocket | null,
  output: Output | null
) {
  socket?.send(JSON.stringify(midi));

  if (midi.type === 'note') {
    sendNote(midi as NoteMessage, output);
  }
  if (midi.type === 'pitchbend') {
    sendPitchBend(midi as PitchbendMessage, output);
  }
}

function sendPitchBend(midi: PitchbendMessage, output: Output | null) {
  const { channel, value } = midi;
  output?.channels[channel].sendPitchBend(value);
}

function sendNote(midi: NoteMessage, output: Output | null) {
  const { channel, note, velocity, action } = midi;
  switch (action) {
    case 'play':
      output?.channels[channel].playNote(note, {
        rawAttack: velocity,
        rawRelease: velocity,
      });
      return;
    case 'stop':
      output?.channels[channel].stopNote(note);
      return;
    default:
      throw new Error(`not implemented action: ${action}`);
  }
}
