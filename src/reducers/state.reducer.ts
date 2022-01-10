import {
  DEFAULT_FILE_NAME,
  INITIAL_STATE,
  LOCAL_STORAGE_ITEM_NAME,
} from '../components/definitions';
import { Action, State } from '../types/state.types';
import { View } from '../types/View.types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_MODULE': {
      const { module } = action;
      const activeView = state.views.find((item) => item.id === state.activeViewId);
      if (!activeView) throw new Error('Could not find activeView');
      activeView.moduleIds = [...activeView.moduleIds, module.id];
      return {
        ...state,
        modules: [...state.modules, module],
      };
    }

    case 'UPDATE_MODULE': {
      const { id, module } = action;
      const otherModules = state.modules.filter((item) => item.id !== id);
      return {
        ...state,
        modules: [...otherModules, module],
      };
    }

    case 'DELETE_MODULE': {
      const { id } = action;
      const otherModules = state.modules.filter((item) => item.id !== id);
      return {
        ...state,
        modules: [...otherModules],
      };
    }

    case 'ADD_VIEW':
      return {
        ...state,
        views: sortViewsByPlace([...state.views, action.view]),
      };

    case 'UPDATE_VIEW': {
      const { id, view } = action;
      if (!state.views.find((view) => view.id === id))
        throw new Error('no view found with id: ' + id);
      const otherViews = state.views.filter((view) => view.id !== id);
      return {
        ...state,
        views: sortViewsByPlace([...otherViews, view]),
      };
    }

    case 'MOVE_VIEW': {
      const { view, toPlace } = action;
      const { views } = state;
      if (!view) throw new Error('no view provided to MOVE_VIEW action');
      if (toPlace > views.length || toPlace <= 0) return state;
      if (view.place === toPlace) return state;
      const [updatedView, updatedViews] = moveView({ view, toPlace, views });
      return {
        ...state,
        views: updatedViews,
        activeViewId: updatedView.id,
      };
    }

    case 'SAVE_STATE_AS': {
      let fileName = action.fileName;
      if (!fileName) fileName = DEFAULT_FILE_NAME;
      if (!fileName.match(/\.[0-9a-z]{1,5}$/i)) fileName += '.json';
      const a = document.createElement('a');
      const file = new Blob([JSON.stringify(state)], { type: 'application/json' });
      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
      return { ...state, fileName: fileName };
    }

    case 'CLEAR_LOCAL_STORAGE': {
      localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, 'null');
      return INITIAL_STATE;
    }

    case 'SET_EDIT_MODE':
      return {
        ...state,
        editMode: action.value,
      };

    case 'SET_SHOW_EDIT_BUTTON':
      return {
        ...state,
        showEditButton: action.value,
        editMode: action.value,
      };

    case 'SET_INVERT_THEME':
      return {
        ...state,
        invertTheme: action.value,
      };

    case 'SET_LEFT_HANDED':
      return {
        ...state,
        leftHanded: action.value,
      };

    case 'SET_ACTIVE_VIEW_ID':
      return {
        ...state,
        activeViewId: action.value,
      };

    case 'SET_VIEWS':
      return {
        ...state,
        views: action.value,
      };

    case 'SET_MODULES':
      return {
        ...state,
        modules: action.value,
      };

    case 'SET_INPUT_NAME':
      return {
        ...state,
        inputName: action.value,
      };

    case 'SET_OUTPUT_NAME':
      return {
        ...state,
        outputName: action.value,
      };

    case 'SET_FILE_NAME':
      return {
        ...state,
        fileName: action.value,
      };

    default:
      return state;
  }
};

function sortViewsByPlace(views: View[]): View[] {
  const updated = views;
  return updated.sort((a: View, b: View) => {
    return a.place - b.place;
  });
}

type MoveViewArgs = {
  view: View;
  toPlace: number;
  views: View[];
};

function moveView({ view, toPlace, views }: MoveViewArgs): [View, View[]] {
  const increment = view.place < toPlace;
  const [min, max] = increment ? [view.place, toPlace] : [toPlace, view.place];
  const isView = (item: View) => item === view;
  const affected = views.filter((item) => item.place >= min && item.place <= max && !isView(item));
  const others = views.filter((item) => !affected.includes(item) && !isView(item));
  const updatedView = { ...view, place: toPlace };
  const updatedViews = sortViewsByPlace([
    ...others,
    ...affected.map((item) => ({
      ...item,
      place: increment ? item.place - 1 : item.place + 1,
    })),
    updatedView,
  ]);
  return [updatedView, updatedViews];
}
