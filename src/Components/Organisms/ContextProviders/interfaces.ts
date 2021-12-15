import { ModuleInterface } from '../../Molecules/Module/Module_model';
import { ViewModel } from '../View/View_model';

export interface UserInterface {
  editMode: boolean;
  invertTheme: boolean;
  showEditButton: boolean;
  leftHanded: boolean;
  activeView: ViewModel;
  views: ViewModel[];
  modules: ModuleInterface[];
  inputName: string;
  outputName: string;
  fileName: string;
}

export type UserContextOrNull = UserContextInterface | null;

export interface UserContextInterface
  extends UserInterface,
    UserContextExtensions {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setShowEditButton: React.Dispatch<React.SetStateAction<boolean>>;
  setInvertTheme: React.Dispatch<React.SetStateAction<boolean>>;
  setLeftHanded: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveView: React.Dispatch<React.SetStateAction<ViewModel>>;
  setViews: React.Dispatch<React.SetStateAction<ViewModel[]>>;
  setModules: React.Dispatch<React.SetStateAction<ModuleInterface[]>>;
  setInputName: React.Dispatch<React.SetStateAction<string>>;
  setOutputName: React.Dispatch<React.SetStateAction<string>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

export interface UserContextExtensions {
  addModule: (view: ViewModel, module: ModuleInterface) => void;
  updateModule: (id: number, module: ModuleInterface) => void;
  deleteModule: (id: number) => void;
  saveUserContextAs: (fileName: string) => void;
  clearLocalStorage: () => void;
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
