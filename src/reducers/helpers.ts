// thanks to Robin Wieruch
// https://www.robinwieruch.de/react-usereducer-middleware/

import { Dispatch, useEffect, useReducer, useRef } from 'react';
import { Action, State } from '../types/state.types';

export function useCustomReducer(
  reducer: (state: State, action: Action) => State,
  initialState: State,
  middlewareFns: ((action: Action, state: State) => void)[],
  afterwareFns: ((action: Action, state: State) => void)[]
): [State, Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actionRef = useRef<Action | null>();

  const dispatchWithMiddleware = (action: Action) => {
    middlewareFns.forEach((middlewareFn) => middlewareFn(action, state));

    (actionRef.current as unknown) = action;

    dispatch(action);
  };

  useEffect(() => {
    if (!actionRef.current) return;

    afterwareFns.forEach((afterwareFn) => afterwareFn(actionRef.current as Action, state));

    actionRef.current = null;
  }, [afterwareFns, state]);

  return [state, dispatchWithMiddleware];
}
