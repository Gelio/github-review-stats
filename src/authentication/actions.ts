import { Action, ActionCreator } from 'redux';

export interface AuthenticationStartedAction
  extends Action<'AUTHENTICATION_STARTED'> {}

export const authenticationStarted: ActionCreator<
  AuthenticationStartedAction
> = () => ({
  type: 'AUTHENTICATION_STARTED',
});

export interface AuthenticationSuccessAction
  extends Action<'AUTHENTICATION_SUCCESS'> {
  authToken: string;
}

export const authenticationSuccess: ActionCreator<
  AuthenticationSuccessAction
> = (authToken: string) => ({
  authToken,
  type: 'AUTHENTICATION_SUCCESS',
});

export interface AuthenticationErrorAction
  extends Action<'AUTHENTICATION_ERROR'> {}

export const authenticationError: ActionCreator<
  AuthenticationErrorAction
> = () => ({
  type: 'AUTHENTICATION_ERROR',
});

export type AuthenticationAction =
  | AuthenticationSuccessAction
  | AuthenticationErrorAction
  | AuthenticationStartedAction;
