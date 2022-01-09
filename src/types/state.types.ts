import { Dispatch } from 'react';
import { ModuleInterface } from './modules';
import { View } from './view';

export type State = {
  editMode: boolean;
  invertTheme: boolean;
  showEditButton: boolean;
  leftHanded: boolean;
  activeView: View;
  views: View[];
  modules: ModuleInterface[];
  inputName: string;
  outputName: string;
  fileName: string;
};

export type Action =
  | { type: 'ADD_MODULE'; view: View; module: ModuleInterface }
  | { type: 'UPDATE_MODULE'; id: number; module: ModuleInterface }
  | { type: 'DELETE_MODULE'; id: number }
  | { type: 'ADD_VIEW'; view: View }
  | { type: 'UPDATE_VIEW'; id: number; view: View }
  | { type: 'MOVE_VIEW'; fromPlace: number; toPlace: number }
  | { type: 'DELETE_VIEW'; id: number }
  | { type: 'SAVE_USER_CONTEXT_AS'; fileName: string }
  | { type: 'CLEAR_LOCAL_STORAGE' }
  | { type: 'SET_EDIT_MODE'; value: boolean }
  | { type: 'SET_SHOW_EDIT_BUTTON'; value: boolean }
  | { type: 'SET_INVERT_THEME'; value: boolean }
  | { type: 'SET_LEFT_HANDED'; value: boolean }
  | { type: 'SET_ACTIVE_VIEW'; value: View }
  | { type: 'SET_VIEWS'; value: View[] }
  | { type: 'SET_MODULES'; value: ModuleInterface[] }
  | { type: 'SET_INPUT_NAME'; value: string }
  | { type: 'SET_OUTPUT_NAME'; value: string }
  | { type: 'SET_FILE_NAME'; value: string };

export type StateContextProviderValue = {
  state: State;
  dispatch: Dispatch<Action>;
};
