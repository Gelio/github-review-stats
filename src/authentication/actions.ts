import { Action } from 'redux';

export interface AuthenticationStartedAction
  extends Action<'AUTHENTICATION_STARTED'> {}

export const authenticationStarted = (): AuthenticationStartedAction => ({
  type: 'AUTHENTICATION_STARTED',
});

export interface AuthenticationSuccessAction
  extends Action<'AUTHENTICATION_SUCCESS'> {
  accessToken: string;
}

export const authenticationSuccess = (
  accessToken: string,
): AuthenticationSuccessAction => ({
  accessToken,
  type: 'AUTHENTICATION_SUCCESS',
});

export interface AuthenticationErrorAction
  extends Action<'AUTHENTICATION_ERROR'> {}

export const authenticationError = (): AuthenticationErrorAction => ({
  type: 'AUTHENTICATION_ERROR',
});

export type AuthenticationAction =
  | AuthenticationSuccessAction
  | AuthenticationErrorAction
  | AuthenticationStartedAction;
