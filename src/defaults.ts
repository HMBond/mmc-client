import { UserInterface } from './Components/Organisms/ContextProviders/interfaces';
import { ViewModel } from './Components/Organisms/View/View_model';

export const MIDI_MIN = 0;
export const MIDI_MAX = 127;

export const LOCAL_STORAGE_THROTTLE_WAIT = 500;

export const LOCAL_STORAGE_ITEM_NAME = 'midi-controller-user-setup';

const defaultView: ViewModel = {
  id: 0,
  label: 'Example',
  backgroundColor: 'indigo',
  place: 0,
  moduleIds: [0, 1],
};

export const DEFAULT_USER_CONTEXT: UserInterface = {
  editMode: false,
  showEditButton: true,
  invertTheme: false,
  leftHanded: false,
  activeView: defaultView,
  inputName: '',
  outputName: '',
  fileName: 'my-modular-midi-controller-setup.json',
  views: [defaultView],
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
