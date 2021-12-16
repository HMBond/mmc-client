type ModuleConstructorArgs = {
  label?: string;
  position?: {
    x: number;
    y: number;
  };
  type?: 'button' | 'slider' | 'settings' | 'module';
};

export interface ModuleInterface {
  id: number;
  label: string;
  type: 'button' | 'slider' | 'settings' | 'module';
  position: {
    x: number;
    y: number;
  };
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
  type: 'button' | 'slider' | 'settings' | 'module' = 'module';
  position = {
    x: 0,
    y: 0,
  };
  [other: string]: any;
}

export type MidiButtonConstructorArgs = ModuleConstructorArgs & {
  channel?: number;
  note?: string;
  velocity?: number;
};

export class MidiButtonModel extends Module {
  constructor(args: MidiButtonConstructorArgs) {
    super({ ...args, type: 'button' });
    if (args.channel) this.channel = args.channel;
    if (args.note) this.note = args.note;
    if (args.velocity || args.velocity === 0) this.velocity = args.velocity;
  }
  label = 'new button';
  channel: number = 1;
  note: string = 'C3';
  velocity: number = 64;
}

type MidiSliderConstructorArgs = ModuleConstructorArgs & {
  channel?: number;
  value?: number;
  orientation: 'horizontal' | 'vertical';
};

export class MidiSliderModel extends Module {
  constructor(args: MidiSliderConstructorArgs) {
    super({ ...args, type: 'slider' });
    if (args.channel) if (this.channel) this.channel = args.channel;
    if (this.value || this.value === 0) this.value = args.value!;
    if (this.orientation) this.orientation = args.orientation;
  }
  label = 'new slider';
  channel: number = 1;
  value: number = 0.8;
  orientation: 'horizontal' | 'vertical' = 'vertical';
}
