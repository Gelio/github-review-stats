import { Dispatch } from 'redux';

import { config } from '../config';
import {
  AuthenticationAction,
  authenticationError,
  authenticationStarted,
  authenticationSuccess,
} from './actions';

export const exchangeCodeForAccessToken = async (
  dispatch: Dispatch<AuthenticationAction>,
  fetch: typeof window.fetch,
  code: string,
) => {
  dispatch(authenticationStarted());

  try {
    const response = await fetch(config.azureAccessTokenFunctionUrl, {
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    const body = await response.json();
    if (!body.access_token) {
      console.error(
        'Could not sign in via an Azure function. Payload received',
        body,
      );
      throw new Error('Could not sign in');
    }

    dispatch(authenticationSuccess(body.access_token));
  } catch (error) {
    dispatch(authenticationError());
  }
};
