import { ReactNode, useReducer } from 'react';
import PropTypes from 'prop-types';
import { reducer } from '../../reducers/state.reducer';
import { StateContext } from '../../context';
import { USER_CONTEXT as INITIAL_STATE } from '../definitions';

const StateContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

StateContextProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default StateContextProvider;
