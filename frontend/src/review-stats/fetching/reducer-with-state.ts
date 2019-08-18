import { Reducer, Action } from 'redux';

type DispatcherReturningState<State, Action> = (action: Action) => State;

export const reducerWithState = <State, A extends Action<any>>(
  reducer: Reducer<State, A>,
): [State, DispatcherReturningState<State, A>] => {
  let state = reducer(undefined, { type: '' } as any);

  return [
    state,
    (action) => {
      state = reducer(state, action);
      return state;
    },
  ];
};
