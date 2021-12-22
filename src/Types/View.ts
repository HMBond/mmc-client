type ViewConstructorArgs = {
  label: string;
  backgroundColor: string;
  currentViewCount: number;
};

export class View {
  constructor({
    label,
    backgroundColor,
    currentViewCount,
  }: ViewConstructorArgs) {
    if (backgroundColor) this.backgroundColor = backgroundColor;
    if (label) this.label = label;
    this.place = currentViewCount + 1;
    this.id = Date.now();
  }
  id;
  label = '';
  backgroundColor = 'indigo';
  place; // placement of view button and view
  moduleIds: number[] = []; // list of module ids to render within the view
}
