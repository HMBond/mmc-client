import { validate } from './validate';
import {
  AddModuleArgs,
  AddViewArgs,
  DeleteModuleArgs,
  DeleteViewArgs,
  MoveViewArgs,
  SaveUserContextAs,
  UpdateModuleArgs,
  UpdateViewArgs,
} from '../../../types/types';
import { sortViewsByPlace } from '../../helpers';
import { View } from '../../../types/view';

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

export function addView({ view, views }: AddViewArgs): View[] {
  validate(view);
  return sortViewsByPlace([...views, view]);
}

export function updateView({ id, view, views }: UpdateViewArgs): View[] {
  if (!views.find((item) => item.id === id)) throw new Error('no view found with id: ' + id);
  validate(view);
  const otherViews = views.filter((item) => item.id !== id);
  return sortViewsByPlace([...otherViews, view]);
}

export function moveView({ view, toPlace, views }: MoveViewArgs): View[] {
  if (toPlace > views.length || toPlace <= 0) return views;
  if (view.place === toPlace) return views;

  let updatedViews = moveAffectedViews(view.place);
  updatedViews = move(view);
  return sortViewsByPlace([...updatedViews]);

  function moveAffectedViews(fromPlace: number) {
    const increment = fromPlace < toPlace;
    const [min, max] = increment ? [fromPlace, toPlace] : [toPlace, fromPlace];
    const affected = views.filter((item) => item.place >= min && item.place <= max);
    const others = views.filter((item) => !affected.includes(item));
    const updated = affected.map((item) => ({
      ...item,
      place: increment ? item.place - 1 : item.place + 1,
    }));
    return [...others, ...updated];
  }

  function move(view: View): View[] {
    const moved = { ...view, place: toPlace };
    return updateView({ id: view.id, view: moved, views: updatedViews });
  }
}

export function deleteView({ id, views }: DeleteViewArgs): View[] {
  const otherViews = views.filter((item) => item.id !== id);
  return sortViewsByPlace([...otherViews]);
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
