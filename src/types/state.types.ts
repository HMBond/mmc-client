import { Dispatch } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { ModuleInterface } from './Module.types';
import { View } from './View.types';

export type State = {
  editMode: boolean;
  invertTheme: boolean;
  showEditButton: boolean;
  leftHanded: boolean;
  activeViewId: number;
  views: View[];
  modules: ModuleInterface[];
  inputId: string;
  outputId: string;
  fileName: string;
  socket?: ReconnectingWebSocket | null;
};

export type Action =
  | { type: 'ADD_MODULE'; module: ModuleInterface }
  | { type: 'UPDATE_MODULE'; id: number; module: ModuleInterface }
  | { type: 'DELETE_MODULE'; id: number }
  | { type: 'ADD_VIEW'; view: View }
  | { type: 'UPDATE_VIEW'; id: number; view: View }
  | { type: 'MOVE_VIEW'; view: View; toIndex: number }
  | { type: 'DELETE_VIEW'; id: number }
  | { type: 'SAVE_STATE_AS'; fileName: string }
  | { type: 'CLEAR_LOCAL_STORAGE' }
  // TODO: All these SET_* implementations can use SET_STATE
  | { type: 'SET_EDIT_MODE'; value: boolean }
  | { type: 'SET_SHOW_EDIT_BUTTON'; value: boolean }
  | { type: 'SET_INVERT_THEME'; value: boolean }
  | { type: 'SET_LEFT_HANDED'; value: boolean }
  | { type: 'SET_ACTIVE_VIEW_ID'; value: number }
  | { type: 'SET_VIEWS'; value: View[] }
  | { type: 'SET_MODULES'; value: ModuleInterface[] }
  | { type: 'SET_INPUT_ID'; value: string }
  | { type: 'SET_OUTPUT_ID'; value: string }
  | { type: 'SET_FILE_NAME'; value: string }
  | { type: 'SET_STATE'; state: State }
  | { type: 'SHARE' };

export type StateContextProviderValue = [state: State, dispatch: Dispatch<Action>];
