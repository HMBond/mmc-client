import { LOCAL_STORAGE_ITEM_NAME, USER_CONTEXT } from '../components/definitions';
import { Action, State } from '../types/state.types';
import { View } from '../types/view';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_MODULE': {
      const { view, module } = action;
      reducer(state, {
        type: 'UPDATE_VIEW',
        id: view.id,
        view: { ...view, moduleIds: [...view.moduleIds, module.id] },
      });
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
        views: [...state.views, action.view],
      };

    case 'UPDATE_VIEW': {
      const { id, view } = action;
      if (!state.views.find((item) => item.id === id))
        throw new Error('no view found with id: ' + id);
      const otherViews = state.views.filter((item) => item.id !== id);
      return {
        ...state,
        views: sortViewsByPlace([...otherViews, view]),
      };
    }

    case 'MOVE_VIEW': {
      const { fromPlace, toPlace } = action;
      const { views } = state;
      const view = views.find((item) => item.place === fromPlace);
      if (!view) throw new Error('no view found on place: ' + fromPlace);
      if (toPlace > views.length || toPlace <= 0) return state;
      if (view.place === toPlace) return state;
      const [updatedView, updatedViews] = moveView({ fromPlace, toPlace, view, views });
      return {
        ...state,
        views: updatedViews,
        activeView: updatedView,
      };
    }

    case 'SAVE_USER_CONTEXT_AS': {
      const a = document.createElement('a');
      const file = new Blob([JSON.stringify(state)], { type: 'application/json' });
      a.href = URL.createObjectURL(file);
      a.download = action.fileName;
      a.click();
      return state;
    }

    case 'CLEAR_LOCAL_STORAGE': {
      localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, 'null');
      return USER_CONTEXT;
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

    case 'SET_ACTIVE_VIEW':
      return {
        ...state,
        activeView: action.value,
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
  fromPlace: number;
  toPlace: number;
  view: View;
  views: View[];
};

function moveView({ fromPlace, toPlace, view, views }: MoveViewArgs): [View, View[]] {
  const increment = fromPlace < toPlace;
  const [min, max] = increment ? [fromPlace, toPlace] : [toPlace, fromPlace];
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
