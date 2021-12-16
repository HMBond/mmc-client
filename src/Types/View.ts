type ViewConstructorArgs = {
  label: string;
  backgroundColor: string;
  views: View[];
};

export class View {
  constructor({ label, backgroundColor, views }: ViewConstructorArgs) {
    if (backgroundColor) this.backgroundColor = backgroundColor;
    if (label) this.label = label;
    this.place = views.length + 1;
    this.id = Date.now();
  }
  id;
  label = '';
  backgroundColor = 'indigo';
  place; // placement of view button and view
  moduleIds: number[] = []; // list of module ids to render within the view
}
