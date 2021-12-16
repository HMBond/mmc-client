import { ModuleInterface } from '../../Molecules/Module/Module_model';
import { ViewModel } from '../View/View_model';
import { UserInterface } from './interfaces';
import { validate } from './validate';

type AddModuleArgs = {
  module: ModuleInterface;
  modules: ModuleInterface[];
  setModules: (value: any) => void;
};

export function addModule(args: AddModuleArgs) {
  const { module, setModules, modules } = args;
  validate(module);
  setModules([...modules, module]);
}

type UpdateModuleArgs = {
  id: Number;
  module: ModuleInterface;
  modules: ModuleInterface[];
  setModules: (value: any) => void;
};

export function updateModule(args: UpdateModuleArgs) {
  const { id, module, setModules, modules } = args;
  validate(module);
  const otherModules = modules.filter((item) => item.id !== id);
  setModules([...otherModules, module]);
}

type DeleteModuleArgs = {
  id: number;
  modules: ModuleInterface[];
  setModules: (value: any) => void;
};

export function deleteModule({ id, modules, setModules }: DeleteModuleArgs) {
  const otherModules = modules.filter((item) => item.id !== id);
  setModules([...otherModules]);
}

type AddViewArgs = {
  view: ViewModel;
  views: ViewModel[];
  setViews: (value: any) => void;
};

export function addView({ view, views, setViews }: AddViewArgs) {
  validate(view);
  setViews(
    [...views, view].sort((a: ViewModel, b: ViewModel) => {
      return a.place - b.place;
    })
  );
}

type UpdateViewArgs = {
  id: number;
  view: ViewModel;
  views: ViewModel[];
  setViews: (value: any) => void;
};

export function updateView({ id, view, views, setViews }: UpdateViewArgs) {
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
