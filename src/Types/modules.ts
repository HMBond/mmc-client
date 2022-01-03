import { Button } from '@mui/material';
import { DEFAULT_VELOCITY } from '../components/definitions';
import { Position } from './types';

export type SliderOrientation = 'horizontal' | 'vertical';

type ModuleConstructorArgs =
  | {
      label?: string;
      position?: {
        x: number;
        y: number;
      };
      type?: ModuleType;
    }
  | undefined;

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
  constructor(args: ModuleConstructorArgs = {}) {
    this.id = Date.now();
    this.label = args.label || '';
    this.type = args.type || 'Settings';
    this.position = args.position || {
      x: 0.75 * window.innerWidth,
      y: 0.15 * window.innerHeight,
    };
  }
  id: number;
  label: string;
  type: ModuleType;
  position: Position;
  [other: string]: any;
}

export type ButtonModuleConstructorArgs = ModuleConstructorArgs & {
  channel?: number;
  note?: string;
  velocity?: number;
};

export class ButtonModule extends Module {
  constructor(args: ButtonModuleConstructorArgs = {}) {
    super({ ...args, type: 'Button' });
    this.channel = args.channel || 1;
    this.note = args.note || 'C3';
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
