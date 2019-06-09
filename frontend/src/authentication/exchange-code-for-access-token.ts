import { Dispatch } from 'redux';

import { config } from '../config';
import {
  AuthenticationAction,
  authenticationError,
  authenticationStarted,
  authenticationSuccess,
} from './actions';
import { getRepositoriesPermissionsFromScope } from './repositories-permissions';

interface ReceiveAccessTokenBody {
  access_token?: string;
  scope?: string;
  token_type: string;
}

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

    const body: ReceiveAccessTokenBody = await response.json();
    if (!body.access_token || !body.scope) {
      console.error(
        'Could not sign in via an Azure function. Payload received',
        body,
      );
      throw new Error('Could not sign in');
    }

    const repositoriesPermissions = getRepositoriesPermissionsFromScope(
      body.scope,
    );

    dispatch(authenticationSuccess(body.access_token, repositoriesPermissions));
  } catch (error) {
    dispatch(authenticationError());
  }
};
