import { ModuleModel } from '../../Molecules/Module/Module_model';
import { ViewModel } from '../View/View_model';

export interface UserContextInterface {
  editMode: boolean;
  invertTheme: boolean;
  showEditButton: boolean;
  activeView: ViewModel;
  inputName: string;
  outputName: string;
  views: ViewModel[];
  modules: ModuleModel[];
  updateModule?: (id: number, module: ModuleModel) => void;
  [other: string]: any;
}
