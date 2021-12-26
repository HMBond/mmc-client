import { DEFAULT_VELOCITY } from '../components/definitions';
import { Position } from './types';

export type SliderOrientation = 'horizontal' | 'vertical';

type ModuleConstructorArgs = {
  label?: string;
  position?: {
    x: number;
    y: number;
  };
  type?: ModuleType;
};

export const moduleTypes = ['Button', 'Slider', 'Settings'] as const;
export type ModuleType = typeof moduleTypes[number];

export interface ModuleInterface {
  id: number;
  label: string;
  type: ModuleType;
  position: Position;
  [other: string]: any;
}

export class Module implements ModuleInterface {
  constructor({ label, position, type }: ModuleConstructorArgs) {
    if (type) this.type = type;
    if (label) this.label = label;
    if (position) this.position = position;
    this.id = Date.now();
  }
  id;
  label = 'new module';
  type: ModuleType = 'Settings';
  position = {
    x: -1,
    y: -1,
  };
  [other: string]: any;
}

export type ButtonModuleConstructorArgs = ModuleConstructorArgs & {
  channel?: number;
  note?: string;
  velocity?: number;
};

export class ButtonModule extends Module {
  constructor(args: ButtonModuleConstructorArgs) {
    super({ ...args, type: 'Button' });
    if (args.channel) this.channel = args.channel;
    if (args.note) this.note = args.note;
    if (args.velocity || args.velocity === 0) this.velocity = args.velocity;
  }
  channel = 1;
  note = 'C3';
  velocity = DEFAULT_VELOCITY;
}

type SliderModuleConstructorArgs = ModuleConstructorArgs & {
  channel?: number;
  value?: number;
  orientation: SliderOrientation;
};

export class SliderModule extends Module {
  constructor(args: SliderModuleConstructorArgs) {
    super({ ...args, type: 'Slider' });
    if (args.channel) this.channel = args.channel;
    if (args.value) this.value = args.value;
    if (args.orientation) this.orientation = args.orientation;
  }
  channel = 1;
  value = 0.8;
  orientation: SliderOrientation = 'vertical';
}
