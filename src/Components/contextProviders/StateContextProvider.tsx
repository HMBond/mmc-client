import PropTypes from 'prop-types';
import { StateContext } from '../../context';
import { INITIAL_STATE, LOCAL_STORAGE_ITEM_NAME, LOG_STATE_ACTIONS } from '../../DEFINITION';
import { reducer } from '../../reducers/state.reducer';
import { ContextProps } from '../../types/context.types';
import { Action, State } from '../../types/state.types';
import { useCustomReducer } from '../../utils/customReducer';

function logger(action: Action, state: State, label?: string) {
  if (LOG_STATE_ACTIONS) {
    console.group(label || 'logger');
    action && console.log(action);
    state && console.log(state);
    console.groupEnd();
  }
}

function saveToLocalStorage(action: Action, state: State) {
  localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, JSON.stringify(state));
}

function StateContextProvider({ children, socket }: ContextProps) {
  const storageItem = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || 'false');
  // TODO: validate stored state
  const [state, dispatch] = useCustomReducer(
    reducer,
    { ...(storageItem || INITIAL_STATE), socket },
    [(action, state) => logger(action, state, 'before')],
    [(action, state) => logger(action, state, 'after'), saveToLocalStorage]
  );

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
}

StateContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default StateContextProvider;
