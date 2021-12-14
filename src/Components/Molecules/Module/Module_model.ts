export class ModuleModel {
  constructor({ id, label, type }: ModuleModel) {
    this.id = id;
    this.label = label;
    this.type = type;
  }
  id: number = -1;
  label: string = '';
  type: 'button' | 'slider' | 'settings' = 'button';
  value?: number | number[];
  [other: string]: any;
}
