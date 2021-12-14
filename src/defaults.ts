import { UserContextInterface } from './Components/Organisms/ContextProviders/interfaces';
import { ViewModel } from './Components/Organisms/View/View_model';

export const MIDI_MIN = 0;
export const MIDI_MAX = 127;

export const LOCAL_STORAGE_THROTTLE_WAIT = 500;

export const LOCAL_STORAGE_ITEM_NAME = 'midi-controller-user-setup';

const defaultView: ViewModel = {
  id: 0,
  label: 'Example',
  backgroundColor: 'black',
  place: 0,
  moduleIds: [0, 1],
};

export const DEFAULT_USER_CONTEXT: UserContextInterface = {
  editMode: false,
  showEditButton: true,
  invertTheme: false,
  activeView: defaultView,
  inputName: '',
  outputName: '',
  fileName: 'my-modular-midi-controller-setup.json',
  views: [defaultView],
  modules: [
    {
      id: 0,
      type: 'button',
      label: 'volume',
      channel: null, // defaults to 1
      note: 'C3', // must unique per channel
      velocity: null, // defaults to 64
    },
    {
      id: 1,
      type: 'slider',
      label: 'volume',
      channel: 16, // must be unique
      value: 0.8,
      orientation: null, // defaults to 'vertical'
    },
  ],
};
