import React, { Component } from 'react';
import { connect, DispatchProp, MapStateToProps } from 'react-redux';

import { StoreState } from '../store';
import { AuthenticationPage } from './authentication-page';
import { AuthenticationVerifier } from './authentication-verifier';
import { exchangeCodeForAccessToken } from './exchange-code-for-access-token';
import { LoadingAuthData } from './loading-auth-data';

interface StoreProps {
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

  public async componentDidMount() {
    const url = new URL(window.location.href);

    if (url.searchParams.has('code')) {
      const code = url.searchParams.get('code') as string;
      url.searchParams.delete('code');
      window.history.replaceState(
        null,
        document.title,
        `${url.pathname}${url.search}`,
      );

      await exchangeCodeForAccessToken(this.props.dispatch, fetch, code);
    }

    this.setState({
      hasInitialized: true,
    });
  }

  public render() {
    const { children, accessToken, dispatch } = this.props;
    const { hasInitialized } = this.state;

    if (!hasInitialized) {
      return <LoadingAuthData />;
    }

    if (!accessToken) {
      return <AuthenticationPage />;
    }

    return (
      <AuthenticationVerifier accessToken={accessToken} dispatch={dispatch}>
        {children}
      </AuthenticationVerifier>
    );
  }
}

const mapStateToProps: MapStateToProps<StoreProps, {}, StoreState> = (
  store,
) => ({
  accessToken: store.authentication.accessToken,
});

const ConnectedAuthChecker = connect(mapStateToProps)(AuthChecker);

export { ConnectedAuthChecker as AuthChecker };
