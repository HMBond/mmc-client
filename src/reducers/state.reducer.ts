import { DEFAULT_FILE_NAME, INITIAL_STATE, LOCAL_STORAGE_ITEM_NAME } from '../DEFINITION';
import { Action, State } from '../types/state.types';

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
        views: [...state.views, action.view],
      };

    case 'UPDATE_VIEW': {
      const { id, view } = action;
      if (!state.views.find((view) => view.id === id))
        throw new Error('no view found with id: ' + id);
      const otherViews = state.views.filter((view) => view.id !== id);
      return {
        ...state,
        views: [...otherViews, view],
      };
    }

    case 'MOVE_VIEW': {
      const { view, toIndex } = action;
      const views = [...state.views]; // make copy for splicing
      const fromIndex = views.indexOf(view);
      if (fromIndex === -1)
        throw new Error(`Could not find view with id ${view.id} in state views`);
      if (toIndex > views.length - 1 || toIndex < 0)
        throw new Error('toIndex must be a valid index within state views');
      if (fromIndex === toIndex) return state; // do nothing

      views.splice(fromIndex, 1); // remove view
      views.splice(toIndex, 0, view); // insert view
      return {
        ...state,
        views,
        activeViewId: view.id,
      };
    }

    case 'DELETE_VIEW': {
      const views = [...state.views]; // make copy for splicing
      const { id } = action;
      if (views.length === 1) {
        throw new Error('Can not delete the last view');
      }
      const view = views.find((item) => item.id === id);
      if (!view) throw new Error(`Could not find view with id ${id} in views`);
      const index = views.indexOf(view);
      views.splice(index, 1);
      return {
        ...state,
        views,
        activeViewId:
          state.activeViewId === action.id
            ? views[index - 1 < 0 ? 0 : index - 1].id
            : state.activeViewId,
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

    case 'SET_INPUT_ID':
      return {
        ...state,
        inputId: action.value,
      };

    case 'SET_OUTPUT_ID':
      return {
        ...state,
        outputId: action.value,
      };

    case 'SET_FILE_NAME':
      return {
        ...state,
        fileName: action.value,
      };

    case 'SET_STATE':
      // TODO: state validation
      return {
        ...action.state,
      };

    case 'SHARE': {
      const { views, modules } = state;
      state.socket?.send(JSON.stringify({ type: 'share', payload: { views, modules } }));
      return {
        ...state,
      };
    }

    default:
      throw new Error(`${(action as Action).type} is not implemented in reducer`);
      return state;
  }
};
