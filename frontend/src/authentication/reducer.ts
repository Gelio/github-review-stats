import { Reducer } from 'redux';

import { AuthenticationAction } from './actions';
import { AuthenticationState } from './interfaces';

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

const defaultState: AuthenticationState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY),
  isLoading: false,
};

export const authenticationReducer: Reducer<
  AuthenticationState,
  AuthenticationAction
> = (state = defaultState, action): AuthenticationState => {
  switch (action.type) {
    case 'AUTHENTICATION_SUCCESS':
      localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, action.accessToken);

      return {
        accessToken: action.accessToken,
        isLoading: false,
        ...state,
      };

    case 'AUTHENTICATION_ERROR':
      return {
        isLoading: false,
        ...state,
      };

    case 'AUTHENTICATION_STARTED':
      return {
        isLoading: false,
        ...state,
      };

    default:
      return state;
  }
};
