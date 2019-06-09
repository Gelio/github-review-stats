import { Action } from 'redux';

import { RepositoriesPermissions } from './repositories-permissions';

export type AuthenticationStartedAction = Action<'AUTHENTICATION_STARTED'>;

export const authenticationStarted = (): AuthenticationStartedAction => ({
  type: 'AUTHENTICATION_STARTED',
});

export interface AuthenticationSuccessAction
  extends Action<'AUTHENTICATION_SUCCESS'> {
  accessToken: string;
  repositoriesPermissions: RepositoriesPermissions;
}

export const authenticationSuccess = (
  accessToken: string,
  repositoriesPermissions: RepositoriesPermissions,
): AuthenticationSuccessAction => ({
  accessToken,
  repositoriesPermissions,
  type: 'AUTHENTICATION_SUCCESS',
});

export type AuthenticationErrorAction = Action<'AUTHENTICATION_ERROR'>;

export const authenticationError = (): AuthenticationErrorAction => ({
  type: 'AUTHENTICATION_ERROR',
});

export type AuthenticationLogoutAction = Action<'AUTHENTICATION_LOGOUT'>;

export const authenticationLogout = (): AuthenticationLogoutAction => ({
  type: 'AUTHENTICATION_LOGOUT',
});

export type AuthenticationLoginAction = Action<'AUTHENTICATION_LOGIN'> & {
  login: string;
};

export const authenticationLogin = (
  login: string,
): AuthenticationLoginAction => ({
  type: 'AUTHENTICATION_LOGIN',
  login,
});

export type AuthenticationAction =
  | AuthenticationSuccessAction
  | AuthenticationErrorAction
  | AuthenticationStartedAction
  | AuthenticationLogoutAction
  | AuthenticationLoginAction;
