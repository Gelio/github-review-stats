import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { Button } from '../common/button';
import { config } from '../config';
import { StoreState } from '../store';
import { authenticationSuccess } from './actions';

interface StoreProps {
  isAuthenticated: boolean;
  authToken?: string;
}

// TODO: complete authentication

interface DispatchProps {
  authenticationSuccess: typeof authenticationSuccess;
}

type AuthCheckerProps = StoreProps & DispatchProps;

class AuthChecker extends React.Component<AuthCheckerProps> {
  public componentDidMount() {
    const url = new URL(window.location.href);

    if (url.searchParams.has('code')) {
      const code = url.searchParams.get('code');

      // TODO: fetch POST to authenticate
    }
  }

  public render() {
    const { isAuthenticated, children } = this.props;

    if (!isAuthenticated) {
      return this.renderAuthenticationButton();
    }

    return children;
  }

  private renderAuthenticationButton = () => {
    return (
      <Button onClick={this.onAuthenticationButtonClick}>Authenticate</Button>
    );
  };

  private onAuthenticationButtonClick = () => {
    const redirectUrl = window.location.href;
    const queryParams = [
      `client_id=${config.GITHUB_CLIENT_ID}`,
      `redirect_uri=${redirectUrl}`,
    ].join('&');

    window.location.href = `https://github.com/login/oauth/authorize?${queryParams}`;
  };
}

const mapStateToProps: MapStateToProps<
  StoreProps,
  null,
  StoreState
> = store => {
  const { authToken } = store.authentication;

  return {
    authToken: authToken || undefined,
    isAuthenticated: !!authToken,
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, null> = {
  authenticationSuccess,
};

const connectedAuthChecker = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AuthChecker);
export { connectedAuthChecker as AuthChecker };
