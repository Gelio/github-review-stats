import { Dispatch } from 'redux';

import {
  AuthenticationAction,
  authenticationLogin,
  authenticationLogout,
} from './actions';

export const verifyUserAuthenticated = async (
  dispatch: Dispatch<AuthenticationAction>,
  fetch: typeof window.fetch,
  accessToken: string,
) => {
  const response = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });

  const isAuthenticated = response.status === 200;

  if (isAuthenticated) {
    const body = await response.json();
    dispatch(authenticationLogin(body.login));
  } else {
    dispatch(authenticationLogout());
  }

  return isAuthenticated;
};
