import { ModuleInterface } from '../../Molecules/Module/Module_model';
import { ViewModel } from '../View/View_model';
import { UserInterface } from './interfaces';
import { validate } from './validate';

type AddModuleProps = {
  module: ModuleInterface;
  setModules: (value: any) => void;
  modules: ModuleInterface[];
};

export function addModule(args: AddModuleProps) {
  const { module, setModules, modules } = args;
  validate(module);
  setModules([...modules, module]);
}

type UpdateModuleProps = {
  id: Number;
  module: ModuleInterface;
  setModules: (value: any) => void;
  modules: ModuleInterface[];
};

export function updateModule(args: UpdateModuleProps) {
  const { id, module, setModules, modules } = args;
  validate(module);
  const otherModules = modules.filter((item) => item.id !== id);
  setModules([...otherModules, module]);
}

type DeleteModuleProps = {
  id: number;
  setModules: (value: any) => void;
  modules: ModuleInterface[];
};

export function deleteModule({ id, setModules, modules }: DeleteModuleProps) {
  const otherModules = modules.filter((item) => item.id !== id);
  setModules([...otherModules]);
}

type UpdateViewProps = {
  id: number;
  view: ViewModel;
  setViews: (value: any) => void;
  views: ViewModel[];
};

export function updateView({ id, view, setViews, views }: UpdateViewProps) {
  validate(view);
  const otherviews = views.filter((item) => item.id !== id);
  setViews([...otherviews, view]);
}

type SaveUserContextAs = {
  fileName: string;
  user: UserInterface;
};

export async function saveUserContextAs({ fileName, user }: SaveUserContextAs) {
  const a = document.createElement('a');
  const file = new Blob([JSON.stringify(user)], { type: 'application/json' });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

export function clearLocalStorage(itemKey: string) {
  localStorage.setItem(itemKey, 'null');
}
