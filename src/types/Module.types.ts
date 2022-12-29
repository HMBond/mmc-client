import PropTypes from 'prop-types';
import { DEFAULT_CHANNEL, DEFAULT_NOTE, DEFAULT_VELOCITY } from '../DEFINITION';
import { uid } from '../utils/id';
import { Position } from './misc.types';

export const ModulePropTypes = PropTypes.shape({
  id: PropTypes.number,
  label: PropTypes.string,
  type: PropTypes.string,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
});

export type SliderOrientation = 'horizontal' | 'vertical';

type ModuleConstructorArgs = {
  label?: string;
  position?: {
    x: number;
    y: number;
  };
  type?: ModuleType;
  [key: string]: any;
};

export const moduleTypes = ['Button', 'Slider', 'Settings', 'Label'] as const;
export type ModuleType = typeof moduleTypes[number];

export interface ModuleInterface {
  id: number;
  label: string;
  type: ModuleType;
  position: Position;
  [other: string]: any;
}

export class Module implements ModuleInterface {
  constructor(args: ModuleConstructorArgs = {}) {
    this.id = uid();
    this.label = args.label || '';
    this.type = args.type || 'Label';
    this.position = args.position || {
      x: 0.75 * window.innerWidth,
      y: 0.15 * window.innerHeight,
    };
    for (const key in args) {
      if (this[key] === undefined) {
        this[key] = args[key];
      }
    }
  }
  id: number;
  label: string;
  type: ModuleType;
  position: Position;
  [other: string]: any;
}

export type ButtonModuleConstructorArgs = ModuleConstructorArgs & {
  channel: number;
  note: string;
  velocity: number;
};

export class ButtonModule extends Module {
  constructor(args: Partial<ButtonModuleConstructorArgs> = {}) {
    super({ ...args, type: 'Button' });
    this.channel = args.channel || DEFAULT_CHANNEL;
    this.note = args.note || DEFAULT_NOTE;
    this.velocity = args.velocity || DEFAULT_VELOCITY;
    if (args.velocity === 0) this.velocity = 0;
  }
  channel: number;
  note: string;
  velocity;
}

type SliderModuleConstructorArgs = ModuleConstructorArgs & {
  channel?: number;
  value?: number;
  orientation?: SliderOrientation;
};

export class SliderModule extends Module {
  constructor(args: SliderModuleConstructorArgs = {}) {
    super({ ...args, type: 'Slider' });
    this.channel = args.channel || 1;
    this.value = args.value || 0.8;
    this.orientation = args.orientation || 'vertical';
  }
  channel: number;
  value: number;
  orientation: SliderOrientation;
}
