import { Reducer } from 'redux';

import { AuthenticationAction } from './actions';
import { AuthenticationState } from './interfaces';
import { RepositoriesPermissions } from './repositories-permissions';

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
const REPOSITORIES_PERMISSIONS_STORAGE_KEY = 'repositoriesPermissions';

export const authenticationReducerFactory = (
  storage: Storage,
): Reducer<AuthenticationState, AuthenticationAction> => {
  const defaultState: AuthenticationState = {
    accessToken: storage.getItem(ACCESS_TOKEN_STORAGE_KEY) || undefined,
    repositoriesPermissions:
      (storage.getItem(
        REPOSITORIES_PERMISSIONS_STORAGE_KEY,
      ) as RepositoriesPermissions) || undefined,
    isLoading: false,
    hasError: false,
    login: undefined,
  };

  return (state = defaultState, action): AuthenticationState => {
    switch (action.type) {
      case 'AUTHENTICATION_SUCCESS':
        storage.setItem(ACCESS_TOKEN_STORAGE_KEY, action.accessToken);
        storage.setItem(
          REPOSITORIES_PERMISSIONS_STORAGE_KEY,
          action.repositoriesPermissions,
        );

        return {
          ...state,
          accessToken: action.accessToken,
          repositoriesPermissions: action.repositoriesPermissions,
          isLoading: false,
        };

      case 'AUTHENTICATION_ERROR':
        return {
          ...state,
          isLoading: false,
          hasError: true,
        };

      case 'AUTHENTICATION_STARTED':
        return {
          ...state,
          isLoading: true,
          hasError: false,
        };

      case 'AUTHENTICATION_LOGOUT':
        storage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
        storage.removeItem(REPOSITORIES_PERMISSIONS_STORAGE_KEY);

        return {
          ...state,
          isLoading: false,
          hasError: false,
          accessToken: undefined,
          repositoriesPermissions: undefined,
          login: undefined,
        };

      case 'AUTHENTICATION_LOGIN':
        return {
          ...state,
          login: action.login,
        };

      default:
        return state;
    }
  };
};
