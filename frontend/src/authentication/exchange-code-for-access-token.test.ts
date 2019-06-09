import { Dispatch } from 'redux';

import {
  AuthenticationAction,
  authenticationError,
  authenticationStarted,
  authenticationSuccess,
} from './actions';
import { exchangeCodeForAccessToken } from './exchange-code-for-access-token';
import { RepositoriesPermissions } from './repositories-permissions';

describe('exchangeCodeForAccessToken', () => {
  let dispatch: Dispatch<AuthenticationAction>;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  it('should dispatch "authentication started" action', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ access_token: 'a', scope: 'repo' }),
      }),
    );

    await exchangeCodeForAccessToken(dispatch, mockFetch, 'code');

    expect(dispatch).toHaveBeenCalledWith(authenticationStarted());
  });

  it('should send a request with the code', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ access_token: 'a', scope: 'repo' }),
      }),
    );

    await exchangeCodeForAccessToken(dispatch, mockFetch, 'code');

    expect(mockFetch).toHaveBeenCalledWith(
      jasmine.stringMatching(/https?:\/\//),
      jasmine.objectContaining({
        body: JSON.stringify({ code: 'code' }),
        method: 'POST',
      }),
    );
  });

  it('should dispatch "authentication success" action when the request was successful', async () => {
    const accessToken = 'access token';

    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({ access_token: accessToken, scope: 'repo' }),
      }),
    );

    await exchangeCodeForAccessToken(dispatch, mockFetch, 'code');

    expect(dispatch).toHaveBeenCalledWith(
      authenticationSuccess(
        accessToken,
        RepositoriesPermissions.PrivateAndPublic,
      ),
    );
  });

  it('should dispatch "authentication error" action when the request failed', async () => {
    const mockFetch = jest.fn(() =>
      Promise.reject(new Error('Request failed')),
    );

    await exchangeCodeForAccessToken(dispatch, mockFetch, 'code');

    expect(dispatch).toHaveBeenCalledWith(authenticationError());
  });

  it('should dispatch "authentication error" action when the request does not contain the access token', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ error: true }),
      }),
    );

    await exchangeCodeForAccessToken(dispatch, mockFetch, 'code');

    expect(dispatch).toHaveBeenCalledWith(authenticationError());
  });
});
