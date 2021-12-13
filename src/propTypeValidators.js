const MIDI_MIN = 0;
const MIDI_MAX = 127;

export function midiRawNumber(props, propName, componentName) {
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
