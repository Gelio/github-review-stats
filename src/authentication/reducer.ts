import { Reducer } from 'redux';
import { AuthenticationAction } from './actions';
import { AuthenticationState } from './interfaces';

const AUTH_TOKEN_STORAGE_KEY = 'authToken';

const defaultState: AuthenticationState = {
  authToken: localStorage.getItem(AUTH_TOKEN_STORAGE_KEY),
  isLoading: false,
};

export const authenticationReducer: Reducer<
  AuthenticationState,
  AuthenticationAction
> = (state = defaultState, action): AuthenticationState => {
  switch (action.type) {
    case 'AUTHENTICATION_SUCCESS':
      return {
        authToken: action.authToken,
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
