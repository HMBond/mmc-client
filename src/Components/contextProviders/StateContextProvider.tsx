import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { reducer } from '../../reducers/state.reducer';
import { StateContext } from '../../context';
import { LOCAL_STORAGE_ITEM_NAME, LOG_STATE_ACTIONS, INITIAL_STATE } from '../definitions';
import { useCustomReducer } from '../../reducers/helpers';
import { Action, State } from '../../types/state.types';

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
