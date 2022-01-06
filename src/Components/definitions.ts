import { UserInterface } from '../types/interfaces';
import { View } from '../types/view';

export const MIDI_CHANNELS = Array.from({ length: 16 }, (_, i) => i + 1);
export const MIDI_MIN = 0;
export const MIDI_MAX = 127;

export const DEFAULT_VELOCITY = 64;

export const LOCAL_STORAGE_DEBOUNCE_WAIT = 2000;

export const LOCAL_STORAGE_ITEM_NAME = 'midi-controller-user-setup';

const INITIAL_VIEW: View = {
  id: 0,
  label: 'Main',
  backgroundColor: 'indigo',
  place: 1, // place starts from first place
  moduleIds: [0, 1],
};

export const USER_CONTEXT: UserInterface = {
  editMode: false,
  showEditButton: true,
  invertTheme: false,
  leftHanded: false,
  activeView: INITIAL_VIEW,
  inputName: '',
  outputName: '',
  fileName: 'my-modular-midi-controller-setup.json',
  views: [INITIAL_VIEW],
  modules: [
    {
      id: 0,
      type: 'Button',
      label: 'Kick',
      channel: 1,
      note: 'C3',
      velocity: DEFAULT_VELOCITY,
      position: {
        x: 100,
        y: 100,
      },
    },
    {
      id: 1,
      type: 'Slider',
      label: 'volume',
      channel: 16,
      value: 0.8,
      orientation: 'vertical',
      position: {
        x: 300,
        y: 100,
      },
    },
  ],
};
