import { UserInterface } from '../types/interfaces';
import { View } from '../types/View';

export const MIDI_MIN = 0;
export const MIDI_MAX = 127;

export const LOCAL_STORAGE_THROTTLE_WAIT = 500;

export const LOCAL_STORAGE_ITEM_NAME = 'midi-controller-user-setup';

const PAGE: View = {
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
  activeView: PAGE,
  inputName: '',
  outputName: '',
  fileName: 'my-modular-midi-controller-setup.json',
  views: [PAGE],
  modules: [
    {
      id: 0,
      type: 'button',
      label: 'Kick',
      channel: 1,
      note: 'C3', // must unique per channel
      velocity: 64,
      position: {
        x: 100,
        y: 100,
      },
    },
    {
      id: 1,
      type: 'slider',
      label: 'volume',
      channel: 16, // must be unique
      value: 0.8,
      orientation: 'vertical',
      position: {
        x: 300,
        y: 100,
      },
    },
  ],
};
