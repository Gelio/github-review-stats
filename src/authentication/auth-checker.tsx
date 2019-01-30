import React, { Component } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { config } from '../config';
import { StoreState } from '../store';
import {
  authenticationError,
  authenticationStarted,
  authenticationSuccess,
} from './actions';
import { AuthenticationPage } from './authentication-page';

interface StoreProps {
  isAuthenticated: boolean;
  authToken?: string;
}

interface DispatchProps {
  authenticationSuccess: typeof authenticationSuccess;
  authenticationStarted: typeof authenticationStarted;
  authenticationError: typeof authenticationError;
}

type AuthCheckerProps = StoreProps & DispatchProps;

class AuthChecker extends Component<AuthCheckerProps> {
  public componentDidMount() {
    const url = new URL(window.location.href);

    if (url.searchParams.has('code')) {
      const code = url.searchParams.get('code') as string;

      this.getAccessToken(code);
    }
  }

  public render() {
    const { isAuthenticated, children } = this.props;

    if (!isAuthenticated) {
      return <AuthenticationPage />;
    }

    return children;
  }

  private getAccessToken = async (code: string) => {
    this.props.authenticationStarted();
    // window.location.search = '';

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
      this.props.authenticationSuccess(body.access_token);
    } catch (error) {
      this.props.authenticationError();
    }
  };
}

const mapStateToProps: MapStateToProps<StoreProps, {}, StoreState> = (
  store,
) => {
  const { accessToken: authToken } = store.authentication;

  return {
    authToken: authToken || undefined,
    isAuthenticated: !!authToken,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
  authenticationSuccess,
  authenticationError,
  authenticationStarted,
};

const ConnectedAuthChecker = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthChecker);

export { ConnectedAuthChecker as AuthChecker };
