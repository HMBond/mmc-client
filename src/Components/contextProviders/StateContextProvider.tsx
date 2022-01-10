import { Dispatch, ReactNode, useReducer } from 'react';
import PropTypes from 'prop-types';
import { reducer } from '../../reducers/state.reducer';
import { StateContext } from '../../context';
import { LOCAL_STORAGE_ITEM_NAME, USER_CONTEXT as INITIAL_STATE } from '../definitions';
import { Action } from '../../types/state.types';

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const storageItem = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ITEM_NAME) || 'false');
  // TODO: validate stored state
  const [state, dispatch] = useReducer(reducer, storageItem || INITIAL_STATE);
  function withMiddleWare(dispatch: Dispatch<Action>): Dispatch<Action> {
    return dispatch;
  }

  return (
    <StateContext.Provider value={{ state, dispatch: withMiddleWare(dispatch) }}>
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default StateContextProvider;
