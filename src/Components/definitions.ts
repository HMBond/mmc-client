import { ButtonModule, SliderModule } from '../types/Module.types';
import { State } from '../types/state.types';
import { View } from '../types/View.types';

export const LOG_STATE_ACTIONS = false;

export const MIDI_CHANNELS = Array.from({ length: 16 }, (_, i) => i + 1);
export const MIDI_MIN = 0;
export const MIDI_MAX = 127;

export const DEFAULT_VELOCITY = 64;

export const LOCAL_STORAGE_DEBOUNCE_WAIT = 2000;

export const LOCAL_STORAGE_ITEM_NAME = 'midi-controller-user-setup';
export const DEFAULT_FILE_NAME = 'my-modular-midi-controller-setup.json';

const button = new ButtonModule({
  label: 'Kick',
  channel: 1,
  note: 'C3',
  velocity: DEFAULT_VELOCITY,
  position: {
    x: 100,
    y: 100,
  },
});

const slider = new SliderModule({
  label: 'hal',
  channel: 16,
  value: 0.8,
  orientation: 'vertical',
  position: {
    x: 300,
    y: 100,
  },
});

const view: View = new View(
  {
    label: 'Main',
    backgroundColor: 'indigo',
    moduleIds: [button.id, slider.id],
  },
  0
);

export const INITIAL_STATE: State = {
  editMode: false,
  showEditButton: true,
  invertTheme: false,
  leftHanded: false,
  activeView: view,
  inputName: '',
  outputName: '',
  fileName: DEFAULT_FILE_NAME,
  views: [view],
  modules: [button, slider],
};
