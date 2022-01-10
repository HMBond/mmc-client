import { MIDI_MAX, MIDI_MIN } from './definitions';

export function midiRawNumber(props: any, propName: string, componentName: string) {
  if (props[propName] === null || props[propName] === undefined) return;
  if (typeof props[propName] != 'number') {
    return new Error(
      'Invalid type of `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Please provide a number between 0-127.'
    );
  }
  if (props[propName] < MIDI_MIN || props[propName] > MIDI_MAX) {
    return new Error(
      'Invalid prop `' +
        propName +
        '` supplied to' +
        ' `' +
        componentName +
        '`. Please provide a number between 0-127.'
    );
  }
}
