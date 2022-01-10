import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import { StateContext } from '../../context';
import { useCustomReducer } from '../../reducers/helpers';
import { reducer } from '../../reducers/state.reducer';
import { Action, State } from '../../types/state.types';
import { INITIAL_STATE, LOCAL_STORAGE_ITEM_NAME, LOG_STATE_ACTIONS } from '../definitions';

function logger(action?: Action, state?: State, label?: string) {
  if (LOG_STATE_ACTIONS) {
    console.group(label || 'logger');
    action && console.log(action);
    state && console.log(state);
    console.groupEnd();
  }
}

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const storageItem = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || 'false');
  // TODO: validate stored state
  const [state, dispatch] = useCustomReducer(
    reducer,
    storageItem || INITIAL_STATE,
    [(action, state) => logger(action, state, 'before')],
    [(action, state) => logger(action, state, 'after')]
  );

  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

StateContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default StateContextProvider;
