import { ModuleInterface } from './modules';
import { UserInterface, UserContextInterface } from './interfaces';
import { View } from './view';

export type UserContextOrNull = UserContextInterface | null;

export interface Position {
  x: number;
  y: number;
}

export type AddModuleArgs = {
  module: ModuleInterface;
  modules: ModuleInterface[];
  setModules: (value: any) => void;
};

export type UpdateModuleArgs = {
  id: number;
  module: ModuleInterface;
  modules: ModuleInterface[];
  setModules: (value: any) => void;
};

export type DeleteModuleArgs = {
  id: number;
  modules: ModuleInterface[];
  setModules: (value: any) => void;
};

export type AddViewArgs = {
  view: View;
  views: View[];
};

export type UpdateViewArgs = AddViewArgs & {
  id: number;
};

export type MoveViewArgs = {
  view: View;
  toPlace: number;
  views: View[];
};

export type DeleteViewArgs = {
  id: number;
  views: View[];
};

export type SaveUserContextAs = {
  fileName: string;
  user: UserInterface;
};
