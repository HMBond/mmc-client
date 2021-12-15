import { ModuleModel } from '../../Molecules/Module/Module_model';
import { ViewModel } from '../View/View_model';

export interface UserInterface {
  editMode: boolean;
  invertTheme: boolean;
  showEditButton: boolean;
  activeView: ViewModel;
  inputName: string;
  outputName: string;
  views: ViewModel[];
  modules: ModuleModel[];
  [other: string]: any;
}

export interface UserContextInterface extends UserInterface {
  setModules: React.Dispatch<React.SetStateAction<ModuleModel[]>>;
  updateModule: (id: number, module: ModuleModel) => void;
  deleteModule: (id: number) => void;
  saveUserContextAs: (fileName: string) => void;
}

export interface MidiContextInterface {
  input: any;
  setInput: (value: any) => void;
  inputs: any;
  setInputs: (value: any) => void;
  output: any;
  setOutput: (value: any) => void;
  outputs: any;
  setOutputs: (value: any) => void;
}
