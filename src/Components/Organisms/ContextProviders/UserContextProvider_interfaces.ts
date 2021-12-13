export interface View {
  id: number;
  label: string;
  backgroundColor: string;
  place: number; // placement of view and view button
  moduleIds: number[]; // list of module ids to render within the view
}

export interface Module {
  id: number;
  label: string;
  type: 'button' | 'slider' | 'settings';
  [other: string]: any;
}

export interface UserContextInterface {
  editMode: boolean;
  invertThemeMode: boolean;
  activeView: View;
  inputName: string;
  outputName: string;
  views: View[];
  modules: Module[];
  [other: string]: any;
}
