import { ModuleModel } from '../../Molecules/Module/Module_model';
import { ViewModel } from '../View/View_model';
import { UserContextInterface } from './interfaces';
import { validate } from './validate';

type UpdateModuleProps = {
  id: Number;
  module: ModuleModel;
  setModules: Function;
  modules: ModuleModel[];
};

export function updateModule({
  id,
  module,
  setModules,
  modules,
}: UpdateModuleProps) {
  validate(module);
  const otherModules = modules.filter((item) => item.id !== id);
  setModules([...otherModules, module]);
}

type DeleteModuleProps = {
  id: number;
  setModules: Function;
  modules: ModuleModel[];
};

export function deleteModule({ id, setModules, modules }: DeleteModuleProps) {
  const otherModules = modules.filter((item) => item.id !== id);
  setModules([...otherModules]);
}

type UpdateViewProps = {
  id: number;
  view: ViewModel;
  setViews: Function;
  views: ViewModel[];
};

export function updateView({ id, view, setViews, views }: UpdateViewProps) {
  validate(view);
  const otherviews = views.filter((item) => item.id !== id);
  setViews([...otherviews, view]);
}

type SaveUserContextAs = {
  fileName: string;
  user: UserContextInterface;
};

export async function saveUserContextAs({ fileName, user }: SaveUserContextAs) {
  const a = document.createElement('a');
  const file = new Blob([JSON.stringify(user)], { type: 'application/json' });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
