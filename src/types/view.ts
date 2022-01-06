import { uid } from './helpers';

type ViewConstructorArgs = {
  label?: string;
  backgroundColor?: string;
};

export class View {
  constructor(
    { label, backgroundColor }: ViewConstructorArgs,
    currentViewCount: number
  ) {
    this.id = uid();
    this.label = label || '';
    this.backgroundColor = backgroundColor || 'indigo';
    this.place = currentViewCount + 1;
    this.moduleIds = [];
  }
  id: number;
  label: string;
  backgroundColor: string;
  place; // placement of view button and view
  moduleIds: number[]; // list of module ids to render within the view
}
