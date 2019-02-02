import { combineReducers, createStore } from 'redux';

import { AuthenticationAction } from './authentication/actions';
import { AuthenticationState } from './authentication/interfaces';
import { authenticationReducerFactory } from './authentication/reducer';

export interface StoreState {
  authentication: AuthenticationState;
}

export type StoreAction = AuthenticationAction;

const reducer = combineReducers<StoreState, StoreAction>({
  authentication: authenticationReducerFactory(localStorage),
});

export const store = createStore(
  reducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
