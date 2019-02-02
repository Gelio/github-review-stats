import React, { Component } from 'react';
import { connect, DispatchProp, MapStateToProps } from 'react-redux';

import { StoreState } from '../store';
import { AuthenticationPage } from './authentication-page';
import { exchangeCodeForAccessToken } from './exchange-code-for-access-token';
import { LoadingAuthData } from './loading-auth-data';

interface StoreProps {
  isAuthenticated: boolean;
  accessToken?: string;
}

type AuthCheckerProps = StoreProps & DispatchProp;

interface AuthCheckerState {
  hasInitialized: boolean;
}

class AuthChecker extends Component<AuthCheckerProps, AuthCheckerState> {
  public state: AuthCheckerState = {
    hasInitialized: false,
  };

  public componentDidMount() {
    const url = new URL(window.location.href);

    if (url.searchParams.has('code')) {
      const code = url.searchParams.get('code') as string;
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname,
      );

      exchangeCodeForAccessToken(this.props.dispatch, fetch, code);
    }

    this.setState({
      hasInitialized: true,
    });
  }

  public render() {
    const { isAuthenticated, children } = this.props;
    const { hasInitialized } = this.state;

    if (!hasInitialized) {
      return <LoadingAuthData />;
    }

    if (!isAuthenticated) {
      return <AuthenticationPage />;
    }

    return children;
  }
}

const mapStateToProps: MapStateToProps<StoreProps, {}, StoreState> = (
  store,
) => {
  const { accessToken } = store.authentication;

  return {
    accessToken: accessToken || undefined,
    isAuthenticated: !!accessToken,
  };
};

const ConnectedAuthChecker = connect(mapStateToProps)(AuthChecker);

export { ConnectedAuthChecker as AuthChecker };
