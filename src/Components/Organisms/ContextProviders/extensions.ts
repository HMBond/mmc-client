import { validate } from './validate';
import {
  AddModuleArgs,
  AddViewArgs,
  DeleteModuleArgs,
  SaveUserContextAs,
  UpdateModuleArgs,
  UpdateViewArgs,
} from '../../../Types/types';
import { sortViewsByPlace } from '../../helpers';

export function addModule(args: AddModuleArgs) {
  const { module, setModules, modules } = args;
  validate(module);
  setModules([...modules, module]);
}

export function updateModule(args: UpdateModuleArgs) {
  const { id, module, setModules, modules } = args;
  validate(module);
  const otherModules = modules.filter((item) => item.id !== id);
  setModules([...otherModules, module]);
}

export function deleteModule({ id, modules, setModules }: DeleteModuleArgs) {
  const otherModules = modules.filter((item) => item.id !== id);
  setModules([...otherModules]);
}

export function addView({ view, views, setViews }: AddViewArgs) {
  validate(view);
  const sorted = sortViewsByPlace([...views, view]);
  setViews(sorted);
}

export function updateView({ id, view, views, setViews }: UpdateViewArgs) {
  validate(view);
  const otherViews = views.filter((item) => item.id !== id);
  const sorted = sortViewsByPlace([...otherViews, view]);
  setViews(sorted);
}

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
